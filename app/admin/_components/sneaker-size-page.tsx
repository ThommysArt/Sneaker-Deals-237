
import React from "react"
import { Sneaker, Sneaker_Size } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { sneaker_sizes_columns } from "@/app/admin/_components/column-def"
import { SneakerSizeForm } from "./sneaker-size-form"



interface SneakerSizePageProps {
    sneaker: Sneaker,
    sneaker_sizes: Array<Sneaker_Size> | null
}

export const SneakerSizePage: React.FC<SneakerSizePageProps> = ({sneaker, sneaker_sizes}) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Sneaker Size</CardTitle>
                <CardDescription>Modify the {sneaker.name} sizes from the shop.</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 lg:gap-3 p-5 lg:p-10">
                <div className="grid items-center gap-1.5">
                    {sneaker_sizes ? (
                        <DataTable columns={sneaker_sizes_columns} data={sneaker_sizes} />
                    ): (
                        <></>
                    )}
                    <SneakerSizeForm sneaker={sneaker} />
                </div>
            </CardContent>
        </Card>
    )
}