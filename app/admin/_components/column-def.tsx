"use client"

import { Sneaker, Brand, Sneaker_Size, Sneaker_Color } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { deleteSneaker } from "@/actions/sneakers"
import { deleteBrand, getBrands } from "@/actions/brands"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { updateSneakerSize } from "@/actions/sneaker-size"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { updateSneakerColor } from "@/actions/sneaker-color"


const DeleteBrand = (brand: Brand, router: AppRouterInstance) => {
    deleteBrand(brand.id)
    router.refresh()
    toast({
        title: "Deleted Brand",
        description: `${brand.name} has been deleted`
    })
}

const DeleteSneaker = (sneaker: Sneaker, router: AppRouterInstance) => {
    deleteSneaker(sneaker.id)
    router.refresh()
    toast({
        title: "Deleted Sneaker",
        description: `${sneaker.name} has been deleted`
    })
}




export const sneakers_table_columns: ColumnDef<Sneaker>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const sneaker = row.original
          const router = useRouter()
     
          return (
            <Dialog>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {router.push(`/admin/sneakers/${sneaker.id}`)}}>Edit Sneaker</DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Delete Sneaker</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Details</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/admin/sneakers/${sneaker.id}/images`)}>Sneaker Images</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/admin/sneakers/${sneaker.id}/colors`)}>Sneaker Colors</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/admin/sneakers/${sneaker.id}/sizes`)}>Sneaker Sizes</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Sneaker</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {sneaker.name} from the shop ?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-4 justify-end">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={() => DeleteSneaker(sneaker, router)}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          )
        },
    },
]

export const brands_table_columns: ColumnDef<Brand>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const brand = row.original
          const router = useRouter()
     
          return (
            <Dialog>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {router.push(`/admin/brands/${brand.id}`)}}>Edit Brand</DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Delete Brand</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Brand</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {brand.name} from the shop ?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-4 justify-end">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={() => DeleteBrand(brand, router)}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          )
        },
    },
]



export const sneaker_sizes_columns: ColumnDef<Sneaker_Size>[] = [
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        id: "available",
        header: "Available",
        cell: ({ row }) => {
            const sneaker_size = row.original
            var available = sneaker_size.available
            const router = useRouter()

            const changeAvailable = async () => {
                if (available === true) {
                    await updateSneakerSize(sneaker_size.id, false)
                    available = false
                } else {
                    await updateSneakerSize(sneaker_size.id, true)
                    available = true
                }
                toast({
                    title: "Updated Sneaker Size",
                    description: `Updated size ${sneaker_size.size}`
                })
                router.refresh()
            }

            return (
                <Switch checked={available} onCheckedChange={changeAvailable} />
            )
        }

    }
]


export const sneaker_colors_columns: ColumnDef<Sneaker_Color>[] = [
    {
        accessorKey: 'color',
        header: "Color"
    },
    {
        id: "available",
        header: "Available",
        cell: ({ row }) => {
            const sneaker_color = row.original
            var available = sneaker_color.available
            const router = useRouter()

            const changeAvailable = async () => {
                if (available === true) {
                    await updateSneakerColor(sneaker_color.id, false)
                    available = false
                } else {
                    await updateSneakerColor(sneaker_color.id, true)
                    available = true
                }
                toast({
                    title: "Updated Sneaker Size",
                    description: `Updated color ${sneaker_color.color}`
                })
                router.refresh()
            }

            return (
                <Switch checked={available} onCheckedChange={changeAvailable} />
            )
        }

    }
]