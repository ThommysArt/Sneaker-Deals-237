import { getSneaker } from "@/actions/sneakers"
import { NavBar } from "@/components/nav-bar"
import { getSneakerImages } from "@/actions/sneaker-image"
import { SneakerImagePage } from "@/app/admin/_components/sneaker-image-page"

export default async function Page ({params}: {params: {sneakerId: string}}) {
    const sneaker = await getSneaker(params.sneakerId)
    const sneaker_images = await getSneakerImages(params.sneakerId)
    return (
        <div className="flex flex-col gap-8">
            <div>
                <NavBar mode="admin"/>
            </div>
            <div className="my-20 px-4 lg:px-20">
                {sneaker && (
                    <SneakerImagePage sneaker={sneaker} sneaker_images={sneaker_images} />
                )}
            </div>
        </div>
    )
}