
import React from "react";
import { useArweave } from "@/context/ArweaveContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { connected, address, connectWallet, disconnectWallet, isLoading } = useArweave();

  return (
    <header className={cn("w-full border-b border-docuvault-border bg-docuvault-surface py-4", className)}>
      <div className="docuvault-container flex items-center justify-between">
        <div className="flex items-center gap-2">
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
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
            <path d="m10 13 2 2 4-4" />
          </svg>
          <h1 className="text-xl font-bold text-docuvault-text">DocuVault</h1>
        </div>

        <div>
          {connected ? (
            <div className="flex items-center gap-3">
              <p className="hidden md:block text-sm text-docuvault-text">
                <span className="text-gray-500">Connected:</span>{" "}
                {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={disconnectWallet}
                disabled={isLoading}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              variant="default"
              size="sm"
              onClick={connectWallet}
              disabled={isLoading}
              className="bg-docuvault-primary hover:bg-docuvault-secondary"
            >
              {isLoading ? "Connecting..." : "Connect ArConnect"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
