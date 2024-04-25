"use client"

import { Sneaker, Sneaker_Image } from "@prisma/client";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createSneakerImages, deleteSneakerImages } from "@/actions/sneaker-image";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface SneakerImageFormProps {
    sneaker_images: Array<Sneaker_Image>
    sneaker: Sneaker
}

export const SneakerImageForm: React.FC<SneakerImageFormProps> = ({sneaker_images, sneaker}) => {
    const router = useRouter()
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();

    const addImage = () => {
        try {
            if (file !== undefined){
                edgestore.publicFiles.upload({file})
                .then(async (res) => {
                    await createSneakerImages(sneaker.id, res.url)
                    router.refresh()
                    toast({
                        title: "Added Sneaker Image",
                        description: `Added ${sneaker.name} images to the shop.`
                    })
                })
            }
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Sneaker Request Failed",
                description: "An error occurred when uploading sneaker image."
            })
        }
    }

    const deleteImage = async (image: Sneaker_Image) => {
        try{
            await deleteSneakerImages(image.id)
            router.refresh()
            toast({
                title: "Deleted Sneaker Image",
                description: `Deleted ${sneaker.name} image from the shop.`
            })
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Sneaker Request Failed",
                description: "An error occurred when deleting sneaker image."
            })
            console.log(err)
        }
    }


    return (
        <div className="flex flex-col w-full items-center gap-1.5" suppressHydrationWarning>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {sneaker_images.map((image, key) => (
                    <Dialog key={key}>
                        <Card className="p-2">
                            <CardContent className="flex flex-col gap-2 p-0 w-36 md:w-48 lg:w-64">
                                <AspectRatio ratio={1/1}>
                                    <Image src={image.image} alt="sneaker image" className="rounded-md object-fill" fill />
                                </AspectRatio>
                                <DialogTrigger><Button variant="destructive">Delete</Button></DialogTrigger>
                            </CardContent>
                        </Card>

                        <DialogContent>
                            <DialogTitle>Delete Sneaker Image</DialogTitle>
                            <DialogDescription>Do you want to delete this {sneaker.name} image ?</DialogDescription>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <Button onClick={() => deleteImage(image)} variant="destructive">Delete</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Add Sneaker Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div>
                            <SingleImageDropzone
                                width={300}
                                height={200}
                                value={file}
                                onChange={(file) => {
                                setFile(file);
                                }}
                            />
                        </div>
                        <Button onClick={addImage}>Save</Button>
                    </div>
                </CardContent>
            </Card>    
        </div>
    )
}