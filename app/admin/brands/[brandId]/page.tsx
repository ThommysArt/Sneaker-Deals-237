import { getBrand } from "@/actions/brands";
import { BrandForm } from "../../_components/brand-form";
import { NavBar } from "@/components/nav-bar";
import { toast } from "@/components/ui/use-toast";

export default async function Page ({ params }: { params: { brandId: number }}) {
    const brand = await getBrand(+params.brandId)
    if (!brand) {
        toast({
            title: "Error getting page",
            description: "An error occurred while getting to the editor page.",
        })
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                <NavBar mode="admin"/>
            </div>
            <div className="my-20 px-4 lg:px-20">
            {brand && (
                <BrandForm mode="edit" brand={brand}/>
            )}
            </div>
        </div>
    )
}