
import React from "react";
import { Button } from "@/components/ui/button";
import { useArweave } from "@/context/ArweaveContext";

const Hero: React.FC = () => {
  const { connected, connectWallet, isLoading } = useArweave();

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-docuvault-background to-white">
      <div className="docuvault-container text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-docuvault-text mb-6 animate-fade-in">
          Store Legal Documents <span className="text-docuvault-primary">Forever</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Securely store your legal documents on the Arweave blockchain.
          Immutable, decentralized, and accessible forever.
        </p>
        
        {!connected && (
          <Button 
            onClick={connectWallet} 
            disabled={isLoading} 
            size="lg"
            className="bg-docuvault-primary hover:bg-docuvault-secondary text-white px-8 py-6 text-lg rounded-md"
          >
            {isLoading ? "Connecting..." : "Connect ArConnect Wallet"}
          </Button>
        )}
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="docuvault-card p-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-docuvault-primary"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M16 2v4"></path>
                <path d="M8 2v4"></path>
                <path d="M3 10h18"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Timestamped Proof</h3>
            <p className="text-gray-600">Every document is immutably timestamped on the Arweave blockchain.</p>
          </div>
          
          <div className="docuvault-card p-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-docuvault-primary"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Permanent Storage</h3>
            <p className="text-gray-600">Documents are stored forever on the decentralized Arweave network.</p>
          </div>
          
          <div className="docuvault-card p-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-docuvault-primary"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-600">Access your documents anytime using your ArConnect wallet.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
