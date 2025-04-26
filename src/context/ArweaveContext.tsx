
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Arweave from "arweave";

// Define the ArConnect window type
declare global {
  interface Window {
    arweaveWallet?: {
      walletName?: string;
      connect(permissions: string[], appInfo?: any): Promise<void>;
      disconnect(): Promise<void>;
      getActiveAddress(): Promise<string>;
      getPermissions(): Promise<string[]>;
      sign(transaction: any): Promise<any>;
    }
  }
}

// Initialize Arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

// Define types for our context
interface ArweaveContextType {
  connected: boolean;
  address: string | null;
  isLoading: boolean;
  error: string | null;
  documents: DocumentInfo[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  uploadDocument: (file: File, tags: Record<string, string>) => Promise<string | null>;
  fetchDocuments: () => Promise<void>;
}

// Document info type
export interface DocumentInfo {
  id: string;
  name: string;
  contentType: string;
  size: number;
  timestamp: number;
  encrypted: boolean;
}

// Create the context
const ArweaveContext = createContext<ArweaveContextType | undefined>(undefined);

// Provider component
export const ArweaveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);

  // Check if ArConnect is installed and if the user is already connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (window.arweaveWallet) {
          const permissions = await window.arweaveWallet.getPermissions();
          if (permissions.includes("ACCESS_ADDRESS")) {
            const addr = await window.arweaveWallet.getActiveAddress();
            setAddress(addr);
            setConnected(true);
            await fetchDocuments();
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    checkConnection();
  }, []);

  // Connect to ArConnect wallet
  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!window.arweaveWallet) {
        throw new Error("ArConnect is not installed. Please install it to continue.");
      }

      // Request permissions
      await window.arweaveWallet.connect([
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
        "SIGNATURE",
      ]);

      // Get the active address
      const addr = await window.arweaveWallet.getActiveAddress();
      setAddress(addr);
      setConnected(true);
      
      // Fetch documents after connecting
      await fetchDocuments();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError(error instanceof Error ? error.message : "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect from ArConnect wallet
  const disconnectWallet = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (window.arweaveWallet) {
        await window.arweaveWallet.disconnect();
      }
      setAddress(null);
      setConnected(false);
      setDocuments([]);
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      setError(error instanceof Error ? error.message : "Failed to disconnect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  // Upload a document to Arweave
  const uploadDocument = async (file: File, tags: Record<string, string>): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!connected || !address) {
        throw new Error("Wallet not connected");
      }

      // Read file data
      const data = await file.arrayBuffer();
      
      // Create transaction
      const transaction = await arweave.createTransaction({ data });

      // Add tags
      Object.entries(tags).forEach(([key, value]) => {
        transaction.addTag(key, value);
      });
      
      // Important tags for document retrieval
      transaction.addTag("Content-Type", file.type);
      transaction.addTag("App-Name", "DocuVault");
      transaction.addTag("Owner", address);
      transaction.addTag("Document-Name", file.name);
      transaction.addTag("Upload-Time", Date.now().toString());

      // Log transaction before signing to help debugging
      console.log("Transaction before signing:", transaction);

      try {
        // Sign using ArConnect
        await window.arweaveWallet.sign(transaction);
        
        // Submit the transaction
        const response = await arweave.transactions.post(transaction);
        console.log("Transaction response:", response);
        
        if (response.status === 200 || response.status === 202) {
          const newDocument = {
            id: transaction.id,
            name: file.name,
            contentType: file.type,
            size: file.size,
            timestamp: Date.now(),
            encrypted: tags["Encrypted"] === "true",
          };
          
          setDocuments(prev => [...prev, newDocument]);
          return transaction.id;
        } else {
          throw new Error(`Failed to upload: ${response.statusText}`);
        }
      } catch (err) {
        console.error("Transaction signing or submission error:", err);
        throw err;
      }
    } catch (error) {
      console.error("Failed to upload document:", error);
      setError(error instanceof Error ? error.message : "Failed to upload document");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch documents for the connected wallet
  const fetchDocuments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!address) return;

      const query = {
        query: `{
          transactions(
            owners: ["${address}"]
            tags: [
              { name: "App-Name", values: ["DocuVault"] }
            ]
          ) {
            edges {
              node {
                id
                tags {
                  name
                  value
                }
                block {
                  timestamp
                }
                data {
                  size
                }
              }
            }
          }
        }`
      };

      // For simplicity, using fetch directly for GraphQL query
      const response = await fetch("https://arweave.net/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query)
      });

      const result = await response.json();
      
      if (result.data && result.data.transactions) {
        const docs = result.data.transactions.edges.map((edge: any) => {
          const tags = edge.node.tags.reduce((acc: any, tag: any) => {
            acc[tag.name] = tag.value;
            return acc;
          }, {});
          
          return {
            id: edge.node.id,
            name: tags["Document-Name"] || "Unnamed Document",
            contentType: tags["Content-Type"] || "application/octet-stream",
            size: edge.node.data ? edge.node.data.size : 0,
            timestamp: tags["Upload-Time"] ? parseInt(tags["Upload-Time"]) : 0,
            encrypted: tags["Encrypted"] === "true",
          };
        });
        
        setDocuments(docs);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch documents");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ArweaveContext.Provider
      value={{
        connected,
        address,
        isLoading,
        error,
        documents,
        connectWallet,
        disconnectWallet,
        uploadDocument,
        fetchDocuments,
      }}
    >
      {children}
    </ArweaveContext.Provider>
  );
};

// Custom hook to use the context
export const useArweave = (): ArweaveContextType => {
  const context = useContext(ArweaveContext);
  if (context === undefined) {
    throw new Error("useArweave must be used within an ArweaveProvider");
  }
  return context;
};
