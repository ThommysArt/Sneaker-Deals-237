import { NavBar } from "@/components/nav-bar";
import Image from "next/image";

import { IMAGE_1, JORDANS_IMAGES, SNEAKERS_BRANDS } from "@/constants/Images";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { HomeRedirectButton } from "@/components/home-redirect-button";


export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <NavBar mode="default"/>
      </div>
      <div className="my-20 px-4 lg:px-20">
        <section>
          <div className="relative">
            <AspectRatio ratio={16/9}><Image src={IMAGE_1} alt="Image 1" className="rounded-lg object-cover" fill/></AspectRatio>
            {/* Overlay */}
            <div className="absolute inset-0 opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-2 pr-28 lg:p-10 lg:pr-96">
              <h1 className="text-xl lg:text-5xl font-bold">Step into Style, Step into Greatness!</h1>
              <p className="text-sm lg:text-xl">Unleash Your Style with Sneaker Deals: Where Every Step is a Savvy Stride!</p>
            </div>
          </div>
        </section>
        <Separator className="my-10 md:my-1 lg:my-20" />
        <section>
          <h1 className="text-xl lg:text-5xl font-semibold mb-10">Discover From The Best Brands</h1>
          {SNEAKERS_BRANDS.map(brand => (
            <div className="flex flex-col">
              <Separator className="my-5 lg:my-10" />
              <h3 className="text-lg lg:text-xl mb-5">{brand.name}</h3>
              <div className="px-10">
                <Carousel className="w-full">
                  <CarouselContent>
                    { brand.images.map(image => (
                      <CarouselItem className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/4">
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-3">
                              <AspectRatio ratio={1/1}>
                                <Image src={image} alt="sneaker image" className="rounded-md object-cover" fill />
                              </AspectRatio>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          ))}
          
        </section>
        <Separator className="my-10 md:my-1 lg:my-20" />
        <section>
          <div className="flex flex-row gap-8 my-10">
            <h3 className="text-md lg:text-2xl">What are you waiting for?</h3>
            <HomeRedirectButton text="Get Started"/>
          </div>
        </section>
      </div>
    </div>
  );
}
