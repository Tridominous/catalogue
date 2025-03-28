"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Loader2, XCircle, Upload } from "lucide-react";
// import { toast } from "@/components/ui/use-toast";
import { toast } from "sonner"
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  value: string | File | null;
  onChange: (value: File | string | null) => void;
  onBlur?: () => void;
};


const FileUploader = ({ value, onChange, onBlur }: FileUploaderProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Get image URL from either File object or string URL
  const getImageUrl = useCallback(() => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    return convertFileToUrl(value);
  }, [value]);
  
  const imageUrl = getImageUrl();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      const file = acceptedFiles[0];
      onChange(file);
      toast.success("🎉 Image selected successfully!");
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024, // 10MB limit
    accept: {
      'image/svg+xml': ['.svg'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: false
  });

  const handleImageDelete = async () => {
    try {
      setIsDeleting(true);
      
      // If it's a File object with createObjectURL, we need to revoke it to prevent memory leaks
      if (value instanceof File && imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      
      onChange(null);
      
      toast.success("Image removed successfully");
    } catch (error) {
      toast.error("Error removing image");
      console.error("Error removing image:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {imageUrl ? (
        <div className="flex flex-col items-center justify-center max-w-[400px] min-w-[100px] max-h-[400px] min-h-[100px] bg-light900 relative">
          <Image 
            src={imageUrl} 
            alt="equipment image" 
            className="object-contain py-6"
            width={500}
            height={300}
          />
          <Button 
            onClick={handleImageDelete} 
            size="icon" 
            variant="ghost" 
            className="text-dark400_light800 absolute right-0 top-0"
            type="button"
          >
            {isDeleting ? <Loader2 className="animate-spin" /> : <XCircle />}
          </Button>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className="flex flex-col items-center justify-center w-full max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4 cursor-pointer"
          onBlur={onBlur}
        >
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 text-primary mb-2" />
          <p className="paragraph-regular text-center">
            <span className="text-primary paragraph-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-dark400_light800 text-sm mt-2">
            SVG, PNG, JPG (Max 10MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;