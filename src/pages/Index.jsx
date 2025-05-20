
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  BookOpen,
  ArrowRight,
  Info
} from 'lucide-react';

const Index = () => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState(1); // Default to Autoencoder
  
  // Load some mock data initially for demonstration
  useEffect(() => {
    // Initially load data without anomalies
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
    const mockData = generateMockTimeSeriesData(90, false); // Start with data without anomalies
    setTimeSeriesData(mockData);
    // Reset any previous analysis results
    setAnalysisResults([]);
  };
  
  const handleAnalyzeClick = () => {
    setIsLoading(true);
    
    // Simulate API call to Python backend for anomaly detection
    setTimeout(() => {
      // Generate new data with anomalies for the analysis result
      const dataWithAnomalies = generateMockTimeSeriesData(90, true);
      const results = generateMockAnomalyScores(dataWithAnomalies);
      
      setAnalysisResults(results);
      setTimeSeriesData(results); // Update the chart with the analysis results
      setIsLoading(false);
      
      const anomalyCount = results.filter(r => r.isAnomaly).length;
      toast({
        title: "Analysis Complete",
        description: `Detected ${anomalyCount} anomalies in your data.`,
        duration: 5000,
      });
    }, 2000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Simplified for college project */}
        <section className="bg-gradient-to-b from-background to-card py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter max-w-3xl">
                FIN.AI: Financial Anomaly Detection
              </h1>
              <p className="text-muted-foreground md:text-lg max-w-[700px]">
                College Project Demo: Using AI to identify unusual patterns in financial time series data
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button 
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    document.getElementById('analysis-section').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Try the Demo
                </button>
                <Link 
                  to="/education" 
                  className="bg-card text-card-foreground border border-border px-6 py-2 rounded-md font-medium hover:bg-secondary/20 transition-colors flex items-center justify-center"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Educational Resources
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Project Overview Section - Specific for college project */}
        <section className="py-8 bg-card/30">
          <div className="container px-4 md:px-6">
            <div className="bg-card rounded-lg border border-border p-4 md:p-6">
              <div className="flex items-start">
                <div className="p-2 bg-primary/10 rounded-full mr-3 hidden sm:block">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">College Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    This financial anomaly detection tool demonstrates how machine learning algorithms can identify unusual 
                    patterns in time series data. The project combines frontend visualization with simulated backend 
                    processing to illustrate the concepts of anomaly detection.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h3 className="font-medium mb-1">Technologies Used:</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>React & Tailwind CSS (Frontend)</li>
                        <li>Recharts (Data visualization)</li>
                        <li>Python & TensorFlow/Keras (Simulated backend)</li>
                        <li>Anomaly detection algorithms (Autoencoder, LSTM)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">References:</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Malhotra et al. "LSTM-based Encoder-Decoder for Anomaly Detection"</li>
                        <li>See <Link to="/education" className="text-primary hover:underline">Educational Resources</Link> for full bibliography</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section - Simplified */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border">
                <div className="p-2 bg-primary/10 rounded-full mb-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">Autoencoder Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Neural networks that identify anomalies through reconstruction error
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border">
                <div className="p-2 bg-primary/10 rounded-full mb-3">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">LSTM Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Sequential models that detect temporal anomalies
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Analysis Section - Main demo area */}
        <section id="analysis-section" className="py-8">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Anomaly Detection Demo</h2>
              <p className="text-muted-foreground">
                Upload financial time series data or use our sample data to see how the algorithm detects anomalies
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <h3 className="font-medium">Upload Data</h3>
                  </div>
                  <div className="p-4">
                    <FileUpload onFileUploaded={handleFileUploaded} />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Upload CSV with timestamp and value columns. For this demo, sample data will be used regardless of the uploaded file.
                    </p>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <h3 className="font-medium">Select Model</h3>
                  </div>
                  <div className="p-3">
                    <div className="space-y-2">
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
                            <div className={`w-3 h-3 rounded-full mr-3 mt-1 ${
                              selectedModel === model.id ? 'bg-primary' : 'bg-muted'
                            }`}></div>
                            <div>
                              <h4 className="font-medium">{model.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {model.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      <Link to="/education" className="text-primary hover:underline">Learn more</Link> about how these algorithms work.
                    </p>
                  </div>
                </div>
                
                <button 
                  className={`w-full py-2 rounded-md font-medium transition-colors flex items-center justify-center ${
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
        
        {/* Educational CTA Section */}
        <section className="py-8 bg-primary/5 mt-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">Learn More About Anomaly Detection</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore our educational resources to understand the theory, methodology, and applications
                of anomaly detection in financial time series data.
              </p>
              <Link 
                to="/education" 
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center"
              >
                Educational Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
