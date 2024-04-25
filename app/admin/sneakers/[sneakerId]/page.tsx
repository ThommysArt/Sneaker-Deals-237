import { getBrands } from "@/actions/brands"
import { getSneaker } from "@/actions/sneakers"
import { SneakerForm } from "@/app/admin/_components/sneaker-form"
import { toast } from "@/components/ui/use-toast"
import { NavBar } from "@/components/nav-bar"

export default async function Page ({params}: {params: {sneakerId: string}}) {
    const sneaker = await getSneaker(params.sneakerId)
    if (!sneaker) {
        toast({
            title: "Error getting page",
            description: "An error occurred while getting to the editor page.",
        })
    }
    const brands = await getBrands()

    return (
        <div className="flex flex-col gap-8">
            <div>
                <NavBar mode="admin"/>
            </div>
            <div className="my-20 px-4 lg:px-20">
                {sneaker && (
                    <SneakerForm mode="edit" sneaker={sneaker} brands={brands}/>
                )}
            </div>
        </div>
    )
}