"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { createSneakerSize} from "@/actions/sneaker-size"
import { Sneaker } from "@prisma/client"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface SneakerSizeFormProps {
    sneaker: Sneaker
}

export const SneakerSizeForm: React.FC<SneakerSizeFormProps> = ({sneaker}) => {
    const router = useRouter()
    const [size, setSize] = useState(41)

    const addSize = async () => {
        try {
            if (size) {
                await createSneakerSize(sneaker, size)
                toast({
                    title: "Added Sneaker Size",
                    description: `Size ${size} of the ${sneaker.name} sneaker has been added.`
                })
                router.refresh()
            } else {
                toast({
                    title: "Incomplete Fields",
                    description: "Please fill the size field before saving.",
                    variant: "destructive"
                })
            }
        } catch (e) {
            toast({
                title: "Sneaker Request Failed",
                description: "An error occurred when creating the sneaker size",
                variant: "destructive"
            })
            console.log(e)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Sneaker size</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-4">
                    <Input type="number" placeholder="41" value={size} onChange={(e) => setSize(+e.target.value)} />
                    <Button onClick={addSize}>Save</Button>
                </div>
            </CardContent>
        </Card>
    )
}