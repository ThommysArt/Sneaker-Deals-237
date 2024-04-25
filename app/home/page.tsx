import { getSneakers } from "@/actions/sneakers"
import { NavBar } from "@/components/nav-bar"
import { HomePage } from "@/app/home/_components/home-page"


export default async function Page () {
    const sneakers = await getSneakers()
    return (
        <div className="flex flex-col gap-8">
            <div>
                <NavBar mode="home"/>
            </div>
            <div className="my-20 px-4 lg:px-20">
                <HomePage sneakers={sneakers} />
            </div>
        </div>
    )
}