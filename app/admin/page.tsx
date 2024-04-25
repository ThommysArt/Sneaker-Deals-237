import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brand, Sneaker } from "@prisma/client"

import { ColumnDef } from "@tanstack/react-table"

import { SneakerDrawer } from "@/app/admin/_components/sneaker-drawer"
import { BrandDrawer } from "@/app/admin/_components/brand-drawer"

import { getBrands } from "@/actions/brands"
import { getSneakers } from "@/actions/sneakers"

import { sneakers_table_columns, brands_table_columns } from "@/app/admin/_components/column-def"

export default async function Page() {
    const brands = await getBrands()
    const sneakers = await getSneakers()


    return (
        <div className="flex flex-col gap-8">
            <div>
                <NavBar mode="admin"/>
            </div>
            <div className="my-20 px-4 lg:px-20">
                <Tabs defaultValue="sneakers">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sneakers">Sneakers</TabsTrigger>
                        <TabsTrigger value="brands">Brands</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sneakers">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sneakers</CardTitle>
                                <CardDescription>
                                    Create or Edit Sneakers found in the shop.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    {sneakers !== null ? 
                                        (
                                            <DataTable columns={sneakers_table_columns} data={sneakers} />
                                        ):(
                                            <div>loading...</div>
                                        )
                                    }
                                </div>
                                <SneakerDrawer mode="create" brands={brands} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="brands">
                        <Card>
                            <CardHeader>
                                <CardTitle>Brands</CardTitle>
                                <CardDescription>
                                    Create or Edit brands found in the shop.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                {sneakers !== null ? 
                                        (
                                            <DataTable columns={brands_table_columns} data={brands} />
                                        ):(
                                            <div>loading...</div>
                                        )
                                    }
                                </div>
                                <BrandDrawer mode="create" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


