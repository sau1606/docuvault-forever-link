
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
          <h3 className="font-medium text-docuvault-text">What is ArConnect?</h3>
          <p className="text-gray-600 mt-1">
            ArConnect is a browser extension wallet for the Arweave blockchain,
            similar to MetaMask for Ethereum. It allows you to securely manage your
            Arweave wallet and interact with decentralized applications.
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Installation Steps:</h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>Visit the ArConnect website</li>
            <li>Install the browser extension for your browser</li>
            <li>Create a new wallet or import an existing one</li>
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
      </CardContent>
    </Card>
  );
};

export default ArConnectInfo;
