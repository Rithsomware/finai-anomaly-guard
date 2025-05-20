
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

const TimeSeriesChart = ({ data, anomalies = [], loading = false }) => {
  const [chartData, setChartData] = useState([]);
  const [chartWidth, setChartWidth] = useState(0);
  
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
            <p className="text-sm font-medium text-destructive">
              Anomaly Detected
            </p>
          )}
          {dataPoint.anomalyScore !== undefined && (
            <p className="text-sm text-muted-foreground">
              Anomaly Score: <span className={`font-medium ${dataPoint.anomalyScore > 0.6 ? 'text-destructive' : 'text-foreground'}`}>
                {dataPoint.anomalyScore.toFixed(3)}
              </span>
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
  
  return (
    <div className="w-full h-[400px] bg-card/30 rounded-lg border border-border p-4">
      <h3 className="text-lg font-medium mb-4">Financial Time Series Data</h3>
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
