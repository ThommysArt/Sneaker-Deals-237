"use client"

import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

interface HomeRedirectButtonProps {
    text: string
}

const HomeRedirectButton:React.FC<HomeRedirectButtonProps> = ({text}) => {
    const router = useRouter()
    return (
        <Button onClick={() => router.push("/home")}>
            {text} 
            <ArrowRightIcon />
        </Button>
    )
}
export {HomeRedirectButton}