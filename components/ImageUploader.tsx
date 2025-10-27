
import React, { useState, useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid PNG or JPG image.");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        onImageUpload(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };


  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-300"><span className="text-indigo-400 font-bold">1.</span> Upload a Product Image</h2>
      <label 
        htmlFor="image-upload" 
        className="cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors duration-300 bg-slate-800/50">
          <input
            id="image-upload"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="mx-auto max-h-48 rounded-md shadow-lg" />
          ) : (
            <div className="flex flex-col items-center">
              <UploadIcon className="h-10 w-10 text-slate-500 mb-2" />
              <p className="text-slate-400">
                <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500 mt-1">PNG or JPG</p>
            </div>
          )}
        </div>
      </label>
       {previewUrl && (
        <button 
          onClick={() => fileInputRef.current?.click()} 
          className="mt-3 text-sm text-indigo-400 hover:text-indigo-300 w-full"
        >
          Change Image
        </button>
       )}
    </div>
  );
};

export default ImageUploader;
