
// Create mock financial time series data for demonstration purposes
export const generateMockTimeSeriesData = (days = 90, hasAnomalies = true) => {
  const data = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - days);
  
  let baseValue = 100 + Math.random() * 50;
  const volatility = 0.02;
  
  // Add some anomalies
  const anomalyIndices = hasAnomalies ? [
    Math.floor(days * 0.2), 
    Math.floor(days * 0.5), 
    Math.floor(days * 0.8)
  ] : [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    
    // Random walk with drift
    const randomChange = (Math.random() - 0.5) * 2 * volatility * baseValue;
    const drift = 0.001 * baseValue;
    
    // Add anomaly if this is an anomaly day
    let anomalyValue = 0;
    if (anomalyIndices.includes(i)) {
      anomalyValue = (Math.random() > 0.5 ? 1 : -1) * baseValue * (0.05 + Math.random() * 0.1);
    }
    
    baseValue = baseValue + randomChange + drift + anomalyValue;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, baseValue.toFixed(2)),
      isAnomaly: anomalyIndices.includes(i)
    });
  }
  
  return data;
};

export const generateMockAnomalyScores = (timeSeriesData) => {
  return timeSeriesData.map(point => ({
    ...point,
    anomalyScore: point.isAnomaly ? 0.8 + Math.random() * 0.2 : Math.random() * 0.3
  }));
};

export const mockModels = [
  { id: 1, name: "Autoencoder", description: "Deep learning model that compares reconstruction error to detect anomalies" },
  { id: 2, name: "LSTM", description: "Long Short-Term Memory network for sequential anomaly detection" },
  { id: 3, name: "Isolation Forest", description: "Ensemble method that isolates anomalies instead of profiling normal points" },
];
