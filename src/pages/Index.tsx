// src/pages/Index.tsx
import React, { useEffect, useState } from "react";
import { ArweaveProvider, useArweave } from "@/context/ArweaveContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DocumentUpload from "@/components/DocumentUpload";
import DocumentList from "@/components/DocumentList";
import Footer from "@/components/Footer";
import ArConnectInfo from "@/components/ArConnectInfo";

// Main application component
const DocuVaultApp: React.FC = () => {
  const { connected } = useArweave();
  const [isArConnectInstalled, setIsArConnectInstalled] = useState<boolean | null>(null);

  useEffect(() => {
    const checkArConnectInstallation = () => {
      setIsArConnectInstalled(!!window.arweaveWallet);
    };

    checkArConnectInstallation();

    // Check for ArConnect installation after a short delay to handle dynamic loading
    const timer = setTimeout(checkArConnectInstallation, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {!connected && <Hero />}
      
      <main className="docuvault-container py-8 flex-grow">
        {isArConnectInstalled === false ? (
          <div className="max-w-lg mx-auto">
            <ArConnectInfo />
          </div>
        ) : connected ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DocumentUpload />
            </div>
            <div className="lg:col-span-2">
              <DocumentList />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="animate-pulse inline-block p-4 bg-blue-50 rounded-full mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-8 w-8 text-docuvault-primary"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-docuvault-text mb-2">Connect Your Wallet</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Connect your ArConnect wallet to access and store your legal documents on Arweave.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Wrap with provider
const Index: React.FC = () => {
  return (
    <ArweaveProvider>
      <DocuVaultApp />
    </ArweaveProvider>
  );
};

export default Index;
