
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import TimeSeriesChart from '../components/TimeSeriesChart';
import AnomalyResults from '../components/AnomalyResults';
import { generateMockTimeSeriesData, generateMockAnomalyScores, mockModels } from '../utils/mockData';
import { toast } from '@/components/ui/use-toast';
import { 
  BarChart3, 
  Brain, 
  LineChart, 
  AlertTriangle, 
  Upload, 
  Settings, 
  ArrowRight 
} from 'lucide-react';

const Index = () => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState(1); // Default to Autoencoder
  
  // Load some mock data initially for demonstration
  useEffect(() => {
    const demoData = generateMockTimeSeriesData(60, false);
    setTimeSeriesData(demoData);
  }, []);
  
  const handleFileUploaded = (file) => {
    setFileUploaded(true);
    toast({
      title: "File uploaded successfully",
      description: "Your data is ready to be analyzed for anomalies.",
      duration: 3000,
    });
    
    // In a real application, we would process the CSV file here
    // For the demo, let's generate new mock data when a file is uploaded
    const mockData = generateMockTimeSeriesData(90, true);
    setTimeSeriesData(mockData);
  };
  
  const handleAnalyzeClick = () => {
    setIsLoading(true);
    
    // Simulate API call to Python backend for anomaly detection
    setTimeout(() => {
      const results = generateMockAnomalyScores(timeSeriesData);
      setAnalysisResults(results);
      setTimeSeriesData(results);
      setIsLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected ${results.filter(r => r.isAnomaly).length} anomalies in your data.`,
        duration: 5000,
      });
    }, 2000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-card py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl">
                Detect Anomalies in Financial Time Series Data with <span className="text-primary">FIN.AI</span>
              </h1>
              <p className="text-muted-foreground md:text-lg max-w-[700px]">
                Leveraging advanced AI to identify unusual patterns in financial data. 
                Upload your time series data and get instant anomaly detection results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button 
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    document.getElementById('analysis-section').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start Analysis
                </button>
                <button className="bg-card text-card-foreground border border-border px-8 py-3 rounded-md font-medium hover:bg-secondary/20 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-card/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Autoencoder Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Using deep learning to reconstruct normal patterns and identify deviations as anomalies.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <LineChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">LSTM Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Long Short-Term Memory networks predict future values and flag unexpected time series behavior.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Early Warning System</h3>
                <p className="text-sm text-muted-foreground">
                  Get alerts about anomalies as they happen to make timely financial decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Analysis Section */}
        <section id="analysis-section" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Analyze Your Financial Data</h2>
              <p className="text-muted-foreground max-w-3xl">
                Upload your financial time series data in CSV format. Our AI models will analyze the data 
                and identify potential anomalies or unusual patterns that could indicate important events.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-medium">Upload Data</h3>
                  </div>
                  <div className="p-4">
                    <FileUpload onFileUploaded={handleFileUploaded} />
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-medium">Select Model</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {mockModels.map(model => (
                        <div 
                          key={model.id}
                          className={`p-3 rounded-md border cursor-pointer transition-colors ${
                            selectedModel === model.id 
                              ? 'bg-primary/10 border-primary' 
                              : 'border-border hover:bg-secondary/20'
                          }`}
                          onClick={() => setSelectedModel(model.id)}
                        >
                          <div className="flex items-start">
                            <div className={`w-4 h-4 rounded-full mr-3 mt-1 ${
                              selectedModel === model.id ? 'bg-primary' : 'bg-muted'
                            }`}></div>
                            <div>
                              <h4 className="font-medium">{model.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {model.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button 
                  className={`w-full py-3 rounded-md font-medium transition-colors flex items-center justify-center ${
                    fileUploaded 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  disabled={!fileUploaded || isLoading}
                  onClick={handleAnalyzeClick}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Data
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              
              <div className="lg:col-span-8 space-y-6">
                <TimeSeriesChart 
                  data={timeSeriesData} 
                  loading={isLoading}
                />
                
                <AnomalyResults 
                  results={analysisResults} 
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Ready to Analyze Your Financial Data?</h2>
              <p className="text-muted-foreground max-w-2xl">
                Start using FIN.AI today to detect anomalies in your financial time series data.
                Our advanced AI models help you identify unusual patterns and make better decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button 
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    document.getElementById('analysis-section').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start Free Trial
                </button>
                <button className="bg-card text-card-foreground border border-border px-8 py-3 rounded-md font-medium hover:bg-secondary/20 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
