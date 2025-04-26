
import React, { useState, useRef } from "react";
import { useArweave } from "@/context/ArweaveContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const DocumentUpload: React.FC = () => {
  const { uploadDocument, connected, isLoading } = useArweave();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [encrypt, setEncrypt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Please upload PDF, DOCX, or TXT files only.");
        return;
      }
      
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File is too large. Maximum size is 10MB.");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(droppedFile.type)) {
        toast.error("Invalid file type. Please upload PDF, DOCX, or TXT files only.");
        return;
      }
      
      // Check file size (10MB limit)
      if (droppedFile.size > 10 * 1024 * 1024) {
        toast.error("File is too large. Maximum size is 10MB.");
        return;
      }
      
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    if (!connected) {
      toast.error("Please connect your ArConnect wallet first");
      return;
    }
    
    setUploading(true);
    
    try {
      // Prepare metadata tags
      const tags = {
        "Document-ID": uuidv4(),
        "Document-Description": description,
        "Encrypted": encrypt.toString(),
      };
      
      // Upload document to Arweave
      const transactionId = await uploadDocument(file, tags);
      
      if (transactionId) {
        toast.success("Document uploaded successfully");
        // Reset form
        setFile(null);
        setDescription("");
        setEncrypt(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error("Failed to upload document");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="docuvault-card">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
        
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            onChange={handleFileChange}
          />
          
          {file ? (
            <div>
              <p className="text-green-600 font-medium">Selected file: {file.name}</p>
              <p className="text-gray-500 text-sm">
                {(file.size / 1024).toFixed(2)} KB
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-10 w-10 text-gray-400 mx-auto mb-2"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
              <p className="text-gray-600 mb-1">Drag & drop a document here, or click to browse</p>
              <p className="text-gray-500 text-sm">Supports PDF, DOCX, and TXT (Max 10MB)</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              placeholder="Add details about this document" 
              className="mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="encrypt" 
              checked={encrypt}
              onCheckedChange={(checked) => setEncrypt(checked === true)}
            />
            <Label htmlFor="encrypt" className="text-sm font-normal cursor-pointer">
              Encrypt document (Coming soon)
            </Label>
          </div>
          
          <Button 
            onClick={handleUpload} 
            className="w-full bg-docuvault-primary hover:bg-docuvault-secondary"
            disabled={!file || uploading || isLoading || !connected}
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
