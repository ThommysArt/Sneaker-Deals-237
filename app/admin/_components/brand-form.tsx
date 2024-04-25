"use client"

import { Brand } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createBrand, updateBrand } from "@/actions/brands";
import { useRouter } from "next/navigation";

interface BrandFormProps {
    mode: "create" | "edit",
    brand?: Brand
}

export const BrandForm: React.FC<BrandFormProps> = ({mode, brand}) => {
    const router = useRouter()
    const { toast } = useToast()
    const [name, setName] = useState("")

    useEffect(() => {
        if (brand){
            setName(brand.name)
        }
    }, [])


    const handleSubmit = async () => {
        try{
            if (mode === "create") {
                if (name) {
                    const newBrand = await createBrand(name)
                    toast({
                        title: "Added New Brand",
                        description: `Added ${newBrand.name} brand to the shop`
                    })
                } else {
                    toast({
                        title: "Incomplete Fields",
                        description: "Please fill the name and upload the brand logo.",
                        variant: "destructive"
                    })
                }
                
                
            } else if (mode === "edit" && brand) {
                if (name) {
                    await updateBrand(brand.id, name)
                    toast({
                        title: "Updated New Brand",
                        description: `${brand.name} has been updated.`
                    })
                } else {
                    toast({
                        title: "Incomplete Fields",
                        description: "Please fill the name and upload the brand logo.",
                        variant: "destructive"
                    })
                }
                
            }
            router.refresh()
            
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Brand Request Failed",
                description: "See the console logs for more details on the problem"
            })
            console.log(err)
        }
    }

    return (
        <Card>
            {mode === "edit" && brand && (
                <CardHeader>
                    <CardTitle>Edit Brand</CardTitle>
                    <CardDescription>Modify the {brand.name} brand from the shop.</CardDescription>
                </CardHeader>
            )}
            <CardContent className="flex flex-col gap-2 lg:gap-3 p-5 lg:p-10">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Name</Label>
                    {brand ? (
                        <Input type="text" id="name" placeholder={brand.name} value={name} onChange={(e) => setName(e.target.value)} />
                    ):(
                        <Input type="text" id="name" placeholder="Nike" onChange={(e) => setName(e.target.value)} />
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