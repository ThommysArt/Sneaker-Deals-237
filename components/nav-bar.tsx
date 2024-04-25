import React from 'react'

import { ModeToggle } from '@/components/theme-button'

import { Separator } from '@/components/ui/separator'

import { SearchBar } from '@/components/search-bar'  
import { AdminRedirectButton } from '@/components/admin-redirect-button'
import { WelcomeRedirectButton } from '@/components/welcome-redirect-button'
import { HomeRedirectButton } from './home-redirect-button'
import { getSneakers } from '@/actions/sneakers'


interface NavBarProps {
    mode: "default" | "admin" | "home"
}
  
const NavBar: React.FC<NavBarProps> = async ({mode}) => {
    const sneakers = await getSneakers()

    return (
        <div className="flex flex-col">
            <div className="flex gap-4 lg:gap-8 fixed w-full h-18 py-4 px-4 lg:px-8 m-0 z-10 backdrop-filter backdrop-blur-md justify-between shadow-lg">
                <div className="flex gap-4 justify-center items-center">
                    <WelcomeRedirectButton />
                    <div className="flex flex-row lg:gap-2 items-center">
                        <h1 className="scroll-m-20 text-md font-bold tracking-tight lg:text-3xl">
                            Sneaker Deals
                        </h1>
                        {mode === "admin" && (<AdminRedirectButton href="/admin" />)}
                    </div>
                </div>
                {mode === "default" && (
                    <div className="flex gap-4 justify-center">
                        <HomeRedirectButton text="More"/>
                        <AdminRedirectButton href="/admin" />
                        <ModeToggle />
                    </div>
                )}
                {mode === "admin" && (
                    <div>
                        <div className="flex gap-2 justify-center">
                            <ModeToggle />
                        </div>
                    </div>
                )}
                {mode === "home" && (
                    <div className="flex gap-4 justify-center">
                        <SearchBar sneakers={sneakers}/>
                    </div>
                )}
            </div>
            <Separator />
        </div>
    )
}

export {NavBar};