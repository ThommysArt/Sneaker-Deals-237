"use client"

import { TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sneaker_Image } from '@prisma/client';

interface ImageInputProps {
    onImagesSelected: (images: FileList) => void,
    sneakerImages?: Array<Sneaker_Image>,
    multiple: boolean,
  }
  
  const ImageInput: React.FC<ImageInputProps> = ({ onImagesSelected, sneakerImages, multiple }) => {
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setSelectedImages(event.target.files);
        onImagesSelected(event.target.files);
      }
    };


  return (
    <div className="flex flex-row items-center gap-4">
      
      {selectedImages ? (
        <div className='flex flex-col w-80 gap-1'>
            <div className="overflow-x-auto">
                <div className="flex flex-row w-auto gap-2 border p-1 rounded-lg">
                    {Array.from(selectedImages).map((file, index) => (
                        <Card key={index}>
                            <CardContent className="flex flex-col gap-2 w-32 aspect-square items-center justify-center p-2">
                                <AspectRatio ratio={1/1}>
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="Selected"
                                        className="rounded-lg shadow-md max-w-xs object-cover object-center"
                                        fill
                                        />
                                </AspectRatio>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <Button variant="destructive" size="sm" className='w-full' onClick={() => setSelectedImages(null)}>Delete<TrashIcon /></Button>
        </div>
      ): (
        <label className="flex flex-col items-center w-32 h-32 px-4 py-6 text-blue rounded-lg shadow-lg tracking-wide border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-500 focus:bg-gray-500">
            <UploadIcon width={50} height={50}/>
            <span className="mt-2 text-base leading-normal text-center font-semibold">Upload Images</span>
            {multiple ? (
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
                />
            ):(
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                />
            )}
            
        </label>
      )}
    </div>
  );
};

export default ImageInput;