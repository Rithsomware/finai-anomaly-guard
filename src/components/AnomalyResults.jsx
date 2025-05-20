
import React from 'react';
import { AlertCircle, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Data Points</h3>
          <p className="text-2xl font-bold">{results.length}</p>
        </div>
        
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Anomalies Detected</h3>
          <p className="text-2xl font-bold text-destructive">{anomalies.length}</p>
        </div>
        
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Anomaly Rate</h3>
          <p className="text-2xl font-bold">{((anomalies.length / results.length) * 100).toFixed(1)}%</p>
        </div>
        
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Time Period</h3>
          <p className="text-2xl font-bold">{results.length} days</p>
        </div>
      </div>
      
      {anomalies.length > 0 && (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium">Detected Anomalies</h3>
          </div>
          <div className="p-0">
            <div className="grid grid-cols-1 divide-y divide-border">
              {anomalies.map((anomaly, index) => (
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
                            <span className="text-sm text-muted-foreground">Anomaly Score: </span>
                            <span className="text-sm font-medium">{anomaly.anomalyScore.toFixed(3)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="ml-auto p-2 hover:bg-secondary/50 rounded-full">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnomalyResults;
