
import React from 'react';
import { DownloadIcon, SparkleIcon, LoadingSpinner } from './icons';

interface GeneratedImageProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, isLoading, error }) => {

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'khalil-ai-art.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-300 text-lg font-semibold">Painting your masterpiece...</p>
          <p className="text-slate-400 text-sm">This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
         <div className="flex flex-col items-center justify-center h-full text-center p-4 border border-red-500/50 bg-red-500/10 rounded-lg">
          <p className="font-semibold text-red-400">An Error Occurred</p>
          <p className="text-slate-400 text-sm mt-1">{error}</p>
        </div>
      );
    }
    
    if (imageUrl) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <img src={imageUrl} alt="Generated Art" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-black/50" />
            </div>
        );
    }
    
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <SparkleIcon className="h-16 w-16 text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-slate-400">Your AI Artwork Will Appear Here</h3>
        <p className="text-slate-500 mt-1">Upload an image and select a style to begin.</p>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-slate-800/50 rounded-lg p-4 flex flex-col justify-between min-h-[400px] lg:min-h-0">
       <h2 className="text-xl font-semibold mb-3 text-slate-300"><span className="text-indigo-400 font-bold">3.</span> Preview</h2>
       <div className="flex-grow flex items-center justify-center my-4">
         {renderContent()}
       </div>
       {imageUrl && !isLoading && (
        <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
        >
            <DownloadIcon className="h-5 w-5 mr-2" />
            Download High Quality
        </button>
       )}
    </div>
  );
};

export default GeneratedImage;
