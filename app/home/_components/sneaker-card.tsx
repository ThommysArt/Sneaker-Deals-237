import { getSneakerImages } from "@/actions/sneaker-image";
import { getBrand } from "@/actions/brands";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Sneaker } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

interface SneakerCardProp {
    sneaker: Sneaker
}

const SneakerCard : React.FC<SneakerCardProp> = async ({sneaker}) => {
    const sneaker_images = await getSneakerImages(sneaker.id)
    const brand = await getBrand(sneaker.brand_id)
    return (
        <Card>
            <CardContent className="flex flex-col gap-5 p-1">
                <AspectRatio ratio={1/1}>
                    <Image src={sneaker_images[0].image} alt="sneaker image" fill className="rounded-md object-cover"/>
                </AspectRatio>
                <div className="flex flex-col">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {sneaker.name}
                    </h3>
                    <div className="flex flex-row gap-4">
                        {brand && (
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                {brand.name}
                            </code>
                        )}
                        <Badge>{sneaker.price} XAF</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export {SneakerCard}