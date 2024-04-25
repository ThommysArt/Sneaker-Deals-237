import { getSneaker } from "@/actions/sneakers";
import { NavBar } from "@/components/nav-bar";
import { getSneakerColors } from "@/actions/sneaker-color";
import { SneakerColorPage } from "@/app/admin/_components/sneaker-color-page";

export default async function Page({params}: {params: {sneakerId: string}}) {
    const sneaker = await getSneaker(params.sneakerId)
    const sneaker_colors = await getSneakerColors(params.sneakerId)

    return (
        <div className="flex flex-col gap-8">
            <div>
                <NavBar mode="admin"/>
            </div>
            <div className="my-20 px-4 lg:px-20">
                {sneaker && (
                    <SneakerColorPage sneaker={sneaker} sneaker_colors={sneaker_colors} /> 
                )}
            </div>
        </div>
    )
}