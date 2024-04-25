"use client"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogHeader, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sneaker, Sneaker_Size, Sneaker_Color } from "@prisma/client"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sendEmail } from "@/lib/mail-service"
import { useRouter } from "next/navigation"

interface SneakerOrderProps {
    sneaker: Sneaker,
    sneaker_sizes: Sneaker_Size[],
    sneaker_colors: Sneaker_Color[],
}

const SneakerOrder: React.FC<SneakerOrderProps> = ({sneaker, sneaker_colors, sneaker_sizes}) => {
    const router = useRouter()
    const [color, setColor] = useState("")
    const [size, setSize] = useState(41)
    const [email, setEmail] = useState("")

    const orderSneaker = () => {
        try {
            if (color && size && email) {
                sendEmail({
                    to_email: email,
                    sneaker_name: sneaker.name,
                    sneaker_size: size,
                    sneaker_color: color,
                    sneaker_price: sneaker.price,
                })
                router.push("/home")
                toast({
                    title: "Sneaker Order Sent",
                    description: `Your order for the ${sneaker.name} has been sent`
                })
            } else {
                toast({
                    variant: 'destructive',
                    title: "Sneaker Order Failed",
                    description: "Please fill in all the required fields."
                })
            }
        } catch (err) {
            toast({
                variant: 'destructive',
                title: "Sneaker Order Failed",
                description: "An unknown error occurred"
            })
            console.log(err)
        }
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Order <PaperPlaneIcon /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Sneaker Order
                    </DialogTitle>
                    <DialogDescription>Select the size and color for your {sneaker.name}.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input type="email" placeholder="example@example.com" value={email} onChange={(e)=> setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="size" className="text-right">
                            Size
                        </Label>
                        <Select onValueChange={(e) => setSize(+e)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Sneaker size" />
                            </SelectTrigger>
                            <SelectContent>
                                {sneaker_sizes.map(size => (
                                    <SelectItem value={size.size.toString()}>{size.size}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="color" className="text-right">
                            Color
                        </Label>
                        <Select onValueChange={(e) => setColor(e)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Sneaker size" />
                            </SelectTrigger>
                            <SelectContent>
                                {sneaker_colors.map(color => (
                                    <SelectItem value={color.color}>{color.color}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button onClick={orderSneaker}>Send</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export {SneakerOrder}