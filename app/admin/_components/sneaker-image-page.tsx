import { Sneaker, Sneaker_Image } from "@prisma/client"
import React from "react"
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { SneakerImageForm } from "@/app/admin/_components/sneaker-image-form"

interface SneakerImagesPageProps {
    sneaker: Sneaker
    sneaker_images: Array<Sneaker_Image>
}

export const SneakerImagePage: React.FC<SneakerImagesPageProps> = ({sneaker, sneaker_images}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Sneaker Images</CardTitle>
                <CardDescription>Modify the {sneaker.name} images from the shop.</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 lg:gap-3 p-5 lg:p-10">
                <SneakerImageForm sneaker_images={sneaker_images} sneaker={sneaker}/>
            </CardContent>
        </Card>
    )
}