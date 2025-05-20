
import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

const FileUpload = ({ onFileUploaded }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };
  
  const validateAndSetFile = (file) => {
    // Check if the file is CSV or a compatible format
    const validTypes = ['text/csv', 'application/vnd.ms-excel'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      setFile(null);
      setIsUploaded(false);
      return;
    }
    
    setFile(file);
    setError('');
    setIsUploaded(true);
    
    // Simulate processing the file and pass it up
    setTimeout(() => {
      if (onFileUploaded) {
        onFileUploaded(file);
      }
    }, 1000);
  };
  
  const resetUpload = () => {
    setFile(null);
    setIsUploaded(false);
    setError('');
  };
  
  return (
    <div className="w-full">
      {!isUploaded ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-10 text-center ${isDragging ? 'border-primary bg-primary/5' : 'border-border'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className={`p-3 rounded-full mb-4 ${isDragging ? 'bg-primary/10' : 'bg-secondary/20'}`}>
              <Upload className={`h-8 w-8 ${isDragging ? 'text-primary' : 'text-secondary'}`} />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload your financial data</h3>
            <p className="text-sm text-muted-foreground mb-4">Drag and drop your CSV file here, or click to browse</p>
            <label className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer">
              Browse Files
              <input 
                type="file" 
                className="hidden" 
                accept=".csv" 
                onChange={handleFileChange}
              />
            </label>
            {error && (
              <div className="mt-4 flex items-center text-destructive text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary/10 rounded-full mr-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{file?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {(file?.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button 
              className="ml-auto text-sm text-muted-foreground hover:text-destructive"
              onClick={resetUpload}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
