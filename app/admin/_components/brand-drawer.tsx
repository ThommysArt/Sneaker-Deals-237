import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Brand } from "@prisma/client";
import { FileIcon, Pencil2Icon, StackIcon } from "@radix-ui/react-icons";
import React from "react";
import { BrandForm } from "./brand-form";

interface BrandDrawerProps {
    mode: "create" | "edit",
    brand?: Brand,
}

export const BrandDrawer: React.FC<BrandDrawerProps> = ({mode, brand}) => {
    return (
        <Drawer>
            <DrawerTrigger>
                {mode === "create" ? (
                    <Button>New <StackIcon /></Button>
                ):(
                    <Button>Edit <Pencil2Icon /></Button>
                )}
            </DrawerTrigger>
            <DrawerContent className="px-4 lg:px-40">
                {mode === "create" ? (
                    <div className="h-4/5 overflow-y-auto">
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Add Brand</DrawerTitle>
                            <DrawerDescription>
                            Add a new sneaker brands to the Sneaker deals shop here.
                            </DrawerDescription>
                        </DrawerHeader>
                        <BrandForm mode="create" />
                        <DrawerFooter className="flex flex-row pt-2">
                            <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                ): brand && (
                    <div className="h-4/5 overflow-y-auto">
                        <DrawerHeader className="text-left">
                            <DrawerTitle>brand.name</DrawerTitle>
                            <DrawerDescription>
                                Edit the Brand: {brand.name} here.
                            </DrawerDescription>
                        </DrawerHeader>
                        <BrandForm mode="edit" brand={brand} />
                        <DrawerFooter className="flex flex-row pt-2">
                            <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                )}
            </DrawerContent>
        </Drawer>
    )
}