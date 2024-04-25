

import { Sneaker } from "@prisma/client"
import { SneakerCard } from "@/app/home/_components/sneaker-card"
import { redirect } from "next/navigation"
import Link from "next/link"

interface HomePageProps {
    sneakers: Array<Sneaker>
}

const HomePage: React.FC<HomePageProps> = ({sneakers}) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {sneakers.map((sneaker: Sneaker, index)=> (
                    <div key={index} className="hover:ring focus:ring ring-gray-400 rounded-md">
                        <Link href={`/home/sneaker/${sneaker.id}`}><SneakerCard sneaker={sneaker} /></Link>
                    </div>
                ))}
            </div>
    )
}

export {HomePage}