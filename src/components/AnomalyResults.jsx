
import React from 'react';
import { AlertCircle, TrendingUp, Calendar, ArrowRight, BookOpen, InfoIcon } from 'lucide-react';

const AnomalyResults = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(index => (
          <div key={index} className="p-4 bg-card rounded-lg border border-border animate-pulse">
            <div className="h-5 w-24 bg-muted rounded mb-3"></div>
            <div className="h-4 w-32 bg-muted/60 rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (!results || results.length === 0) {
    return (
      <div className="p-6 bg-card/30 rounded-lg border border-border text-center">
        <div className="p-3 bg-muted/20 rounded-full inline-block mb-3">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">No Results Available</h3>
        <p className="text-sm text-muted-foreground">
          Upload your time series data to analyze for anomalies
        </p>
      </div>
    );
  }
  
  // Filter anomalies
  const anomalies = results.filter(point => point.isAnomaly);
  
  return (
    <div className="space-y-6">
      {/* Educational note for college project */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start">
          <div className="p-2 bg-primary/10 rounded-full mr-3 mt-1">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Educational Context</h3>
            <p className="text-sm text-muted-foreground">
              This anomaly detection simulation demonstrates how machine learning models identify unusual patterns 
              in financial time series data. In a production environment, these detections would be validated against 
              known market events and refined through continuous learning.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Data Points</h3>
          <p className="text-2xl font-bold">{results.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Sample size for analysis</p>
        </div>
        
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Anomalies Detected</h3>
          <p className="text-2xl font-bold text-destructive">{anomalies.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Unusual data points identified</p>
        </div>
        
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Anomaly Rate</h3>
          <p className="text-2xl font-bold">{((anomalies.length / results.length) * 100).toFixed(1)}%</p>
          <p className="text-xs text-muted-foreground mt-1">
            {((anomalies.length / results.length) * 100) <= 5 ? 'Normal range (1-5%)' : 'Higher than expected (>5%)'}
          </p>
        </div>
        
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Time Period</h3>
          <p className="text-2xl font-bold">{results.length} days</p>
          <p className="text-xs text-muted-foreground mt-1">Duration of analysis</p>
        </div>
      </div>
      
      {anomalies.length > 0 && (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium">Detected Anomalies</h3>
          </div>
          <div className="p-0">
            <div className="grid grid-cols-1 divide-y divide-border">
              {anomalies.map((anomaly, index) => {
                // Educational notes for different anomaly types based on score
                let anomalyType, explanation;
                const score = anomaly.anomalyScore || 0.5;
                
                if (score > 0.8) {
                  anomalyType = "Point Anomaly";
                  explanation = "Significant deviation from expected value range, often indicating a sudden shock or error.";
                } else if (score > 0.6) {
                  anomalyType = "Contextual Anomaly";
                  explanation = "Unusual within the current market context, but might be normal in other circumstances.";
                } else {
                  anomalyType = "Collective Anomaly";
                  explanation = "Part of an unusual pattern or trend that may require further investigation.";
                }
                
                return (
                  <div key={index} className="p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-destructive/10 rounded-full mr-3">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm font-medium">{anomaly.date}</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm font-medium">${parseFloat(anomaly.value).toFixed(2)}</span>
                          </div>
                          {anomaly.anomalyScore !== undefined && (
                            <div className="hidden sm:block">
                              <span className="text-sm text-muted-foreground">Score: </span>
                              <span className="text-sm font-medium">{anomaly.anomalyScore.toFixed(3)}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Educational element */}
                        <div className="mt-2 text-xs text-muted-foreground flex items-center">
                          <InfoIcon className="h-3 w-3 mr-1" />
                          <span>Type: <span className="font-medium">{anomalyType}</span> — {explanation}</span>
                        </div>
                      </div>
                      <button className="ml-auto p-2 hover:bg-secondary/50 rounded-full">
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnomalyResults;
