
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ArConnectInfo: React.FC = () => {
  return (
    <Card className="docuvault-card">
      <CardHeader>
        <CardTitle>ArConnect Required</CardTitle>
        <CardDescription>
          To use DocuVault, you need to install the ArConnect browser extension
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-blue-50 border border-blue-100">
          <AlertDescription>
            <h3 className="font-medium text-docuvault-text">What is ArConnect?</h3>
            <p className="text-gray-600 mt-1">
              ArConnect is a browser extension wallet for the Arweave blockchain,
              similar to MetaMask for Ethereum. It allows you to securely manage your
              Arweave wallet and interact with decentralized applications.
            </p>
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <h4 className="font-medium">Installation Steps:</h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>Visit the <a href="https://www.arconnect.io" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">ArConnect website</a></li>
            <li>Install the browser extension for your browser</li>
            <li>Create a new wallet or import an existing one</li>
            <li>Add funds to your wallet (required for document uploads)</li>
            <li>Return to DocuVault and connect your wallet</li>
          </ol>
        </div>
        
        <div className="pt-2">
          <Button 
            className="w-full bg-docuvault-primary hover:bg-docuvault-secondary"
            onClick={() => window.open("https://www.arconnect.io", "_blank")}
          >
            Get ArConnect Extension
          </Button>
        </div>
        
        <p className="text-xs text-center text-gray-500">
          Note: After installation, you'll need to fund your wallet with some AR tokens to pay for document storage.
        </p>
      </CardContent>
    </Card>
  );
};

export default ArConnectInfo;
