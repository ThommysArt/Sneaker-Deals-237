"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Brand, Sneaker } from "@prisma/client";
import { useEffect, useState } from "react";
import { createSneaker, updateSneaker } from "@/actions/sneakers";
import { useRouter } from "next/navigation";

interface SneakerFormProps {
    mode: "create" | "edit",
    sneaker?: Sneaker
    brands: Array<Brand>
}
  

const SneakerForm: React.FC<SneakerFormProps> = ({mode, sneaker, brands}) => {
    const router = useRouter()
    const { toast } = useToast()
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)

    const chooseBrand = (value: string) => {
        brands.map((b) => {
            if (b.name === value) {
                setSelectedBrand(b)
            }
        })
    }

    useEffect(() =>{
        if (sneaker) {
            setName(sneaker.name)
            setPrice(sneaker.price)
        }
    }, [])


    const handleSubmit = async () => {
        try {
            if (name && price && selectedBrand) {
                if (mode === "create") {
                    await createSneaker(selectedBrand, name,price)
                    .then (async (sneaker) => {
                        toast({
                            title: "Registered Sneaker",
                            description: `${sneaker.name} has been added to the shop`
                        })
                    })
                    .catch ((error: Error) => {
                        toast({
                            variant: "destructive",
                            title: "Request Failed (Server Error)",
                            description: "Failed to register new sneaker. See the console logs for more information."
                        })
                        console.log(error)
                    })
                
                } else if (mode === "edit" && sneaker) {
                    await updateSneaker(sneaker.id, selectedBrand, name, price)
                    .then (async (sneaker) => {
                        toast({
                            title: "Updated Sneaker",
                            description: `${sneaker.name} has been updated in the shop`
                        })
                    })
                    .catch ((error: Error) => {
                        toast({
                            variant: "destructive",
                            title: "Request Failed (Server Error)",
                            description: "Failed to update sneaker. See the console logs for more information."
                        })
                        console.log(error)
                    })
                }
                router.refresh()
            } else {
                toast({
                    title: "Incomplete Fields",
                    description: "Please fill all required fields before submitting",
                    variant: "destructive"
                })
            }
            
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Request Failed (Runtime Error)",
                description: "See the console logs for more details on the problem"
            })
            console.log(err)
        }
    }
    return (
        <Card>
            {mode === "edit" && sneaker && (
                <CardHeader>
                    <CardTitle>Edit Sneaker</CardTitle>
                    <CardDescription>Modify the {sneaker.name} from the shop.</CardDescription>
                </CardHeader>
            )}

            <CardContent className="flex flex-col gap-2 lg:gap-3 p-5 lg:p-10">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Name</Label>
                    {sneaker ? (
                        <Input type="text" id="name" placeholder={sneaker.name} value={name} onChange={(e) => setName(e.target.value)} />
                    ):(
                        <Input type="text" id="name" placeholder="Air Force 1" onChange={(e) => setName(e.target.value)} />
                    )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Brand</Label>
                    <Select onValueChange={(value) => chooseBrand(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Brand" />
                        </SelectTrigger>
                        <SelectContent>
                            {brands !== null ? 
                            brands.map((brand: Brand) => (
                                <SelectItem value={brand.name}>{brand.name}</SelectItem>
                            )):
                            (<></>)
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Price (XAF)</Label>
                    {sneaker ? (
                        <Input type="number" id="price" placeholder="12000" value={price} onChange={(e) => setPrice(+e.target.value)} />
                    ):(
                        <Input id="price" placeholder="12000" onChange={(e) => setPrice(+e.target.value)} />
                    )}
                    
                </div>
                <div className="flex flex-row gap-4 justify-end">
                    <Button onClick={handleSubmit}>Save</Button>
                    <Button variant="outline" onClick={() => router.push("/admin")}>Cancel</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export {SneakerForm}