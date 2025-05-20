import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { BookOpen, BrainCircuit, LineChart, AlertTriangle, ChevronRight } from 'lucide-react';

const Education = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-card py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Financial Anomaly Detection: Educational Resources
              </h1>
              <p className="text-muted-foreground md:text-lg max-w-[700px]">
                Understanding the theory and applications of anomaly detection in financial time series data.
              </p>
            </div>
          </div>
        </section>
        
        {/* Algorithms Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Anomaly Detection Algorithms</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Autoencoder */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-full mr-3">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Autoencoder Neural Networks</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Autoencoders are a type of artificial neural network used to learn efficient data codings in an unsupervised manner. They compress the input into a latent-space representation and then reconstruct the output.
                </p>
                <h4 className="font-medium mb-2">How it works for anomaly detection:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
                  <li>The autoencoder is trained on normal financial data patterns</li>
                  <li>The model learns to reconstruct normal patterns with minimal error</li>
                  <li>When presented with an anomaly, the reconstruction error is higher</li>
                  <li>Points with reconstruction errors above a threshold are flagged as anomalies</li>
                </ol>
                <h4 className="font-medium mb-2">Academic References:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Sakurada, M., & Yairi, T. (2015). "Anomaly Detection Using Autoencoders with Nonlinear Dimensionality Reduction"</li>
                  <li>Chen, X., et al. (2018). "Variational Lossy Autoencoder for Anomaly Detection in Financial Time-Series"</li>
                </ul>
              </div>
              
              {/* LSTM */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-full mr-3">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Long Short-Term Memory Networks</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  LSTM networks are a special kind of Recurrent Neural Network (RNN) capable of learning long-term dependencies in sequence data. They are particularly well-suited for analyzing and predicting time series data.
                </p>
                <h4 className="font-medium mb-2">How it works for anomaly detection:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
                  <li>The LSTM is trained to predict the next value in a financial time series</li>
                  <li>The model learns temporal patterns and seasonal variations in the data</li>
                  <li>Significant differences between predicted and actual values indicate anomalies</li>
                  <li>The prediction error distribution helps establish anomaly thresholds</li>
                </ol>
                <h4 className="font-medium mb-2">Academic References:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Malhotra, P., et al. (2015). "Long Short Term Memory Networks for Anomaly Detection in Time Series"</li>
                  <li>Hundman, K., et al. (2018). "Detecting Spacecraft Anomalies Using LSTMs and Nonparametric Dynamic Thresholding"</li>
                </ul>
              </div>
              
              {/* Statistical Methods */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-full mr-3">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Statistical Methods</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Traditional statistical approaches use mathematical techniques to model the time series data and identify values that deviate significantly from expected behavior.
                </p>
                <h4 className="font-medium mb-2">Common techniques:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
                  <li>Z-score: Flag points that are multiple standard deviations away from the mean</li>
                  <li>Moving Average: Compare points against locally smoothed values</li>
                  <li>ARIMA/SARIMA: Model time series patterns and detect residual outliers</li>
                  <li>Exponential Smoothing: Weight recent observations more heavily than older ones</li>
                </ol>
                <h4 className="font-medium mb-2">Academic References:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Chandola, V., et al. (2009). "Anomaly Detection: A Survey"</li>
                  <li>Gupta, M., et al. (2014). "Outlier Detection for Temporal Data: A Survey"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Financial Anomalies Section */}
        <section className="py-12 bg-card/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Types of Financial Anomalies</h2>
            
            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold mb-3">Point Anomalies</h3>
                <p className="mb-3 text-muted-foreground">
                  Individual data points that deviate significantly from the norm. In financial data, these could represent sudden price spikes, flash crashes, or reporting errors.
                </p>
                <h4 className="font-medium mb-2">Examples:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Flash crash of May 6, 2010, when the Dow Jones dropped nearly 1,000 points in minutes</li>
                  <li>Erroneous trade entries causing momentary price distortions</li>
                  <li>Dividend distribution dates causing price adjustments</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold mb-3">Contextual Anomalies</h3>
                <p className="mb-3 text-muted-foreground">
                  Data points that are anomalous only in specific contexts. For financial time series, this could be unusual behavior for a particular time of day, day of the week, or market condition.
                </p>
                <h4 className="font-medium mb-2">Examples:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Unusually high trading volume outside of market hours</li>
                  <li>Price movements that are normal during earnings season but anomalous otherwise</li>
                  <li>Sector-specific trends that deviate from broader market patterns</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold mb-3">Collective Anomalies</h3>
                <p className="mb-3 text-muted-foreground">
                  Groups of related data points that are anomalous with respect to the entire dataset. In finance, these could indicate market manipulation, systematic issues, or regime changes.
                </p>
                <h4 className="font-medium mb-2">Examples:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Market bubbles and crashes (dot-com bubble, 2008 financial crisis)</li>
                  <li>Pump-and-dump schemes in low-volume securities</li>
                  <li>Coordinated trading patterns indicative of market manipulation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Methodology Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Project Methodology</h2>
            
            <div className="bg-card rounded-lg border border-border p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Data Processing Pipeline</h3>
              
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                <li className="p-3 bg-muted rounded-md">
                  <span className="font-medium text-foreground">Data Collection & Preprocessing</span>
                  <p className="mt-2 text-sm ml-6">
                    Financial time series data is collected from various sources, cleaned, and normalized. Missing values are handled using appropriate interpolation techniques, and the data is checked for consistency and quality.
                  </p>
                </li>
                
                <li className="p-3 bg-muted rounded-md">
                  <span className="font-medium text-foreground">Feature Engineering</span>
                  <p className="mt-2 text-sm ml-6">
                    Raw financial data is transformed into relevant features that help in anomaly detection. This includes technical indicators (moving averages, volatility measures), temporal features (day of week, month), and derived metrics (returns, log differences).
                  </p>
                </li>
                
                <li className="p-3 bg-muted rounded-md">
                  <span className="font-medium text-foreground">Model Selection & Training</span>
                  <p className="mt-2 text-sm ml-6">
                    Multiple models (Autoencoder, LSTM, Isolation Forest) are trained on normal financial data. Hyperparameters are optimized using validation data to maximize anomaly detection accuracy without excessive false positives.
                  </p>
                </li>
                
                <li className="p-3 bg-muted rounded-md">
                  <span className="font-medium text-foreground">Anomaly Scoring & Threshold Selection</span>
                  <p className="mt-2 text-sm ml-6">
                    Each data point receives an anomaly score based on the selected model's output. Thresholds for flagging anomalies are determined using statistical methods or domain knowledge about acceptable deviation levels.
                  </p>
                </li>
                
                <li className="p-3 bg-muted rounded-md">
                  <span className="font-medium text-foreground">Validation & Performance Evaluation</span>
                  <p className="mt-2 text-sm ml-6">
                    Models are evaluated using metrics like precision, recall, F1-score, and ROC-AUC on labeled test data where anomalies are known. For unlabeled data, domain experts may review detected anomalies to validate model performance.
                  </p>
                </li>
              </ol>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-semibold mb-4">Implementation Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Frontend Technologies:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
                    <li>React for UI components and state management</li>
                    <li>Tailwind CSS for styling and responsive design</li>
                    <li>Recharts for interactive data visualization</li>
                    <li>File upload functionality for CSV/JSON data input</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Backend (Python) Components:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
                    <li>Data processing with Pandas and NumPy</li>
                    <li>Deep learning models using TensorFlow/Keras</li>
                    <li>Statistical anomaly detection with scikit-learn</li>
                    <li>API endpoints using Flask or FastAPI</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">College Project Scope:</h4>
                <p className="text-sm text-muted-foreground">
                  This implementation focuses on demonstrating the concepts of financial anomaly detection through visualization and simulated models. The frontend provides an educational interface while the backend (to be developed) will implement the actual anomaly detection algorithms using Python's data science ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-primary/5">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Try FIN.AI?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Apply these anomaly detection techniques to your own financial data
              and start identifying unusual patterns.
            </p>
            <Link 
              to="/" 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center"
            >
              Go to Analysis Tool
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Education;
