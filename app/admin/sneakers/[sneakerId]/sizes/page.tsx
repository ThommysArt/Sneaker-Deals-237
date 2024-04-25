import { getSneaker } from "@/actions/sneakers";
import { getSneakerSizes } from "@/actions/sneaker-size";
import { NavBar } from "@/components/nav-bar";
import { SneakerSizePage } from "@/app/admin/_components/sneaker-size-page";

export default async function Page({params}: {params: {sneakerId: string}}) {
    const sneaker = await getSneaker(params.sneakerId)
    const sneaker_sizes = await getSneakerSizes(params.sneakerId)

    return (
        <div className="flex flex-col gap-8">
            <div>
                <NavBar mode="admin"/>
            </div>
            <div className="my-20 px-4 lg:px-20">
                {sneaker && (
                    <SneakerSizePage sneaker={sneaker} sneaker_sizes={sneaker_sizes} /> 
                )}
            </div>
        </div>
    )
}