
import React from "react"
import { Sneaker, Sneaker_Color } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import { sneaker_colors_columns } from "@/app/admin/_components/column-def"
import { SneakerColorForm } from "./sneaker-color-form"



interface SneakerColorPageProps {
    sneaker: Sneaker,
    sneaker_colors: Array<Sneaker_Color> | null
}

export const SneakerColorPage: React.FC<SneakerColorPageProps> = ({sneaker, sneaker_colors}) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Sneaker color</CardTitle>
                <CardDescription>Modify the {sneaker.name} colors from the shop.</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 lg:gap-3 p-5 lg:p-10">
                <div className="grid items-center gap-1.5">
                    {sneaker_colors ? (
                        <DataTable columns={sneaker_colors_columns} data={sneaker_colors} />
                    ): (
                        <></>
                    )}
                    <SneakerColorForm sneaker={sneaker} />
                </div>
            </CardContent>
        </Card>
    )
}