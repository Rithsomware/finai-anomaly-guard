
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-6">
        <div className="flex justify-center">
          <div className="space-y-3 text-center">
            <h4 className="text-lg font-semibold">FIN.AI</h4>
            <p className="text-sm text-muted-foreground">
              Advanced anomaly detection for financial time series data.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} FIN.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
