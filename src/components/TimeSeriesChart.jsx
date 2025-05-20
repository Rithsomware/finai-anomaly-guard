
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea, Legend } from 'recharts';

const TimeSeriesChart = ({ data, anomalies = [], loading = false }) => {
  const [chartData, setChartData] = useState([]);
  const [chartWidth, setChartWidth] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(true);
  
  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
    }
  }, [data]);
  
  useEffect(() => {
    const updateWidth = () => {
      setChartWidth(window.innerWidth < 768 ? window.innerWidth - 50 : window.innerWidth * 0.7);
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Value: <span className="text-foreground font-medium">${parseFloat(dataPoint.value).toFixed(2)}</span>
          </p>
          {dataPoint.isAnomaly && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-sm font-medium text-destructive">
                Anomaly Detected
              </p>
              <p className="text-xs text-muted-foreground">
                This point deviates significantly from expected patterns.
              </p>
            </div>
          )}
          {dataPoint.anomalyScore !== undefined && (
            <p className="text-sm text-muted-foreground mt-1">
              Anomaly Score: <span className={`font-medium ${dataPoint.anomalyScore > 0.6 ? 'text-destructive' : 'text-foreground'}`}>
                {dataPoint.anomalyScore.toFixed(3)}
              </span>
              {dataPoint.anomalyScore > 0.6 && <span className="text-xs text-destructive ml-1">(High)</span>}
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-card/50 rounded-lg border border-border">
        <div className="animate-pulse text-center">
          <div className="h-4 w-24 bg-muted rounded mb-2 mx-auto"></div>
          <div className="h-2 w-40 bg-muted/60 rounded mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-card/50 rounded-lg border border-border">
        <p className="text-muted-foreground">No data available to display</p>
      </div>
    );
  }
  
  // Find anomaly regions for educational highlighting
  const anomalyRegions = [];
  let inRegion = false;
  let startIdx = -1;
  
  chartData.forEach((point, idx) => {
    if (point.isAnomaly && !inRegion) {
      inRegion = true;
      startIdx = idx;
    } else if (!point.isAnomaly && inRegion) {
      inRegion = false;
      anomalyRegions.push({ start: startIdx, end: idx - 1 });
    }
  });
  
  // Close any open region at the end
  if (inRegion) {
    anomalyRegions.push({ start: startIdx, end: chartData.length - 1 });
  }
  
  return (
    <div className="w-full bg-card/30 rounded-lg border border-border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Financial Time Series Data</h3>
        <div className="flex items-center">
          <button 
            className="text-xs bg-muted px-2 py-1 rounded-md hover:bg-muted/80 transition-colors"
            onClick={() => setShowAnnotations(prev => !prev)}
          >
            {showAnnotations ? 'Hide' : 'Show'} Annotations
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
            <span>Asset Price</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-destructive rounded-full mr-1"></div>
            <span>Anomaly Point</span>
          </div>
          {showAnnotations && (
            <div className="flex items-center">
              <div className="w-3 h-3 bg-destructive/20 rounded-sm mr-1"></div>
              <span>Anomaly Region</span>
            </div>
          )}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
            name="Asset Price"
          />
          {
            chartData.map((entry, index) => (
              entry.isAnomaly && (
                <ReferenceDot 
                  key={`anomaly-${index}`}
                  x={entry.date} 
                  y={entry.value} 
                  r={6}
                  fill="hsl(var(--destructive))"
                  stroke="hsl(var(--background))"
                />
              )
            ))
          }
          
          {/* Educational annotations */}
          {showAnnotations && anomalyRegions.map((region, idx) => {
            const startDate = chartData[region.start].date;
            const endDate = chartData[region.end].date;
            return (
              <ReferenceArea
                key={`region-${idx}`}
                x1={startDate}
                x2={endDate}
                fill="hsl(var(--destructive))"
                fillOpacity={0.2}
                strokeOpacity={0.5}
                stroke="hsl(var(--destructive))"
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
      
      {/* Educational note */}
      <div className="mt-4 bg-muted/20 p-3 rounded-md border border-border text-sm">
        <p className="font-medium mb-1">Educational Note:</p>
        <p className="text-muted-foreground">
          Anomalies in financial time series often represent important events like market shocks, 
          flash crashes, or reporting errors. The highlighted points show where values deviate significantly 
          from expected patterns. These could indicate trading opportunities or risks.
        </p>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
