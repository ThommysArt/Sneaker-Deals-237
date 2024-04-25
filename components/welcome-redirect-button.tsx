"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { DARK_LOGO } from "@/constants/logos";
import { useRouter } from "next/navigation";

export const WelcomeRedirectButton = () => {
    const router = useRouter()
    return (
        <div className="flex w-10 items-center" onClick={() => router.push("/")}>
            <AspectRatio ratio={1/1}>
                <Image src={DARK_LOGO} alt="Image" className="rounded-md object-cover border border-black" fill/>
            </AspectRatio>
        </div>
    )
};
