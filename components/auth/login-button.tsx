"use client"

import { useRouter } from "next/navigation";


import { space } from "postcss/lib/list";
import { Children } from "react";

interface LoginButtonProps {
    children : React.ReactNode;
    mode? : "modal" | "redirect",
    asChild? : boolean;
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
} : LoginButtonProps) => {

    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login")
    }

    if (mode === "modal") {
        return (
            <span>
                Todo : Implement Modal
            </span>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}