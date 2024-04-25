"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { createSneakerColor } from "@/actions/sneaker-color"
import { Sneaker } from "@prisma/client"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface SneakerColorFormProps {
    sneaker: Sneaker
}

export const SneakerColorForm: React.FC<SneakerColorFormProps> = ({sneaker}) => {
    const router = useRouter()
    const [color, setColor] = useState("")

    const addColor = async () => {
        try {
            if (color) {
                await createSneakerColor(sneaker, color)
                toast({
                    title: "Added Sneaker color",
                    description: `Color ${color} of the ${sneaker.name} sneaker has been added.`
                })
                router.refresh()
            } else {
                toast({
                    title: "Incomplete Fields",
                    description: "Please fill the color field before saving.",
                    variant: "destructive"
                })
            }
        } catch (e) {
            toast({
                title: "Sneaker Request Failed",
                description: "An error occurred when creating the sneaker color",
                variant: "destructive"
            })
            console.log(e)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Sneaker Color</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-4">
                    <Input type="text" placeholder="white" value={color} onChange={(e) => setColor(e.target.value)} />
                    <Button onClick={addColor}>Save</Button>
                </div>
            </CardContent>
        </Card>
    )
}