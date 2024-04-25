"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";

interface AdminRedirectButtonProps {
    href: string,
}

export const AdminRedirectButton: React.FC<AdminRedirectButtonProps> = ({href}) => {
    const router = useRouter()
    return (
        <Button variant="secondary" onClick={() => router.push("/admin")}>
            <PersonIcon />
        </Button>
    )
}