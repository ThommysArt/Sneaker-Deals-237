"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Sneaker } from "@prisma/client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
  

interface searchBarProps {
    sneakers: Sneaker[]
}

export const SearchBar: React.FC<searchBarProps> = ({sneakers}) => {
    const router = useRouter()
    const [searchResults, setSearchResults] = useState<Sneaker[]|null>(null)

    const searchSneaker = (searchText: string) => {
        setSearchResults(sneakers.filter((sneaker) => 
            sneaker.name.toLowerCase().includes(searchText.toLowerCase()))
        )
    }

    return (
        <div className="flex flex-row items-center">
            <Input className="rounded-l-lg rounded-r-none" placeholder="Search..." onChange={e=>searchSneaker(e.target.value)}/>
            <DropdownMenu>
                <DropdownMenuTrigger><Button size="icon" className="rounded-r-lg rounded-l-none"><MagnifyingGlassIcon /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Sneakers</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {searchResults && searchResults.map((sneaker, key) => (
                        <DropdownMenuItem key={key} onClick={()=>router.push(`/home/sneaker/${sneaker.id}`)}>{sneaker.name}</DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

