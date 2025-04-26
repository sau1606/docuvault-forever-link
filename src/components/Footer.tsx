
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 bg-docuvault-surface border-t border-docuvault-border">
      <div className="docuvault-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-5 w-5 text-docuvault-primary mr-2"
            >
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
              <path d="m10 13 2 2 4-4" />
            </svg>
            <span className="text-docuvault-text font-semibold">DocuVault</span>
          </div>
          
          <div className="text-sm text-gray-600">
            Powered by{" "}
            <a 
              href="https://www.arweave.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-docuvault-primary hover:text-docuvault-secondary"
            >
              Arweave
            </a>{" "}
            and{" "}
            <a 
              href="https://www.arconnect.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-docuvault-primary hover:text-docuvault-secondary"
            >
              ArConnect
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a 
                  href="https://www.arweave.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-docuvault-primary"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="https://www.arconnect.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-docuvault-primary"
                >
                  Help
                </a>
              </li>
              <li>
                <a 
                  href="https://viewblock.io/arweave" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-docuvault-primary"
                >
                  Explorer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
