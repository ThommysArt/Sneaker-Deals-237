import { getSneakerImages } from "@/actions/sneaker-image";
import { getSneakerColors } from "@/actions/sneaker-color";
import { getSneakerSizes } from "@/actions/sneaker-size";
import { getSneaker } from "@/actions/sneakers";
import { getBrand } from "@/actions/brands";
import { NavBar } from "@/components/nav-bar";
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { SneakerOrder } from "@/app/home/_components/sneaker-order";


export default async function Page ({params}: {params: {sneakerID: string}}) {
    const sneaker = await getSneaker(params.sneakerID)
    let brand = null
    if (sneaker) {
        brand = await getBrand(sneaker.brand_id)
    } 
    const sneaker_images = await getSneakerImages(params.sneakerID)
    const sneaker_sizes = await getSneakerSizes(params.sneakerID)
    const sneaker_colors = await getSneakerColors(params.sneakerID)

    return (
        <div className="flex flex-col gap-8">
            <div>
                <NavBar mode="home"/>
            </div>
            <div className="my-20 px-4 lg:px-20">
                {sneaker && brand && (
                    <div className="flex flex-col gap-5 lg:gap-8">
                        <div className="flex flex-col gap-3">
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                {sneaker.name}
                            </h2>
                            <p>
                                by <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{brand.name}</code>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                            {sneaker_images.map((image, index) => (
                                <div key={index}>
                                     <Card>
                                        <CardContent className="flex flex-col p-1">
                                            <AspectRatio ratio={1/1}>
                                                <Image src={image.image} alt="sneaker image" className="rounded-md object-center" fill />
                                            </AspectRatio>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                           
                        </div>
                        <Separator />
                        <div className="flex flex-row gap-5 items-center" suppressHydrationWarning>
                            <p>Liked the product ?</p>
                            <SneakerOrder sneaker={sneaker} sneaker_colors={sneaker_colors} sneaker_sizes={sneaker_sizes}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}