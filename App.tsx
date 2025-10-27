
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import GeneratedImage from './components/GeneratedImage';
import { SparkleIcon, LoadingSpinner } from './components/icons';
import { ArtStyle } from './types';
import { generateArt } from './services/geminiService';


const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setUploadedFile(file);
    // Reset generated image when a new image is uploaded
    setGeneratedImageUrl(null); 
    setError(null);
  }, []);

  const handleStyleSelect = useCallback((style: ArtStyle) => {
    setSelectedStyle(style);
  }, []);

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedStyle) {
      setError("Please upload an image and select a style first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateArt(uploadedFile, selectedStyle);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isGenerateDisabled = !uploadedFile || !selectedStyle || isLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-2 flex-grow">
        <Header />
        <main className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col gap-8 p-6 bg-slate-800 rounded-xl shadow-lg">
            <ImageUploader onImageUpload={handleImageUpload} />
            <StyleSelector selectedStyle={selectedStyle} onStyleSelect={handleStyleSelect} />
            <button
              onClick={handleGenerate}
              disabled={isGenerateDisabled}
              className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-800"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner/>
                  <span className="ml-2">Generating...</span>
                </>
              ) : (
                <>
                  <SparkleIcon className="h-5 w-5 mr-2" />
                  Generate Art
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center p-2">
             <GeneratedImage imageUrl={generatedImageUrl} isLoading={isLoading} error={error} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
