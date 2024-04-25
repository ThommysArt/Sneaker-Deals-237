import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { FileIcon, Pencil2Icon, StackIcon } from "@radix-ui/react-icons";

import { getBrands } from "@/actions/brands";
import { SneakerForm } from "@/app/admin/_components/sneaker-form";
import { Brand, Sneaker } from "@prisma/client";

interface SneakerDrawerProps {
    sneaker?: Sneaker,
    mode: "create" | "edit",
    brands: Array<Brand>
}

export const SneakerDrawer: React.FC<SneakerDrawerProps> = ({sneaker, mode, brands}) => {
    
    return (
      <Drawer>
        <DrawerTrigger asChild>
            {mode === "create" ? (
                <Button>New <StackIcon/></Button>
            ):(
                <Button>Edit<Pencil2Icon /></Button>
            )}
        </DrawerTrigger>
        <DrawerContent className="px-4 lg:px-40">
            {mode === "create" ? (
                <div className="h-4/5 overflow-y-auto">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Add Sneakers</DrawerTitle>
                        <DrawerDescription>
                        Add a new sneaker to the sneaker deals shop here.
                        </DrawerDescription>
                    </DrawerHeader>
                    <SneakerForm brands={brands} mode={mode} />
                    <DrawerFooter className="flex flex-row pt-2">
                        <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            ): sneaker && (
                <div className="h-4/5 overflow-y-auto">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>{sneaker.name}</DrawerTitle>
                        <DrawerDescription>
                            Edit the Sneaker: {sneaker.name} here.
                        </DrawerDescription>
                    </DrawerHeader>
                    <SneakerForm brands={brands} mode={mode} />
                    <DrawerFooter className="flex flex-row pt-2">
                        <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
                )
            }
        </DrawerContent>
      </Drawer>
    )
  }