'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Plus } from "lucide-react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"

export default function Header({ name, picture }: { name: string, picture: string }) {
    const router = useRouter();
    const logout = () => {
        router.push('/api/auth/logout');
    }
    return (
        <div className="flex justify-between items-center">
            <div className="font-medium">Hello {name}</div>
            <div className="flex gap-2 items-center">
                <Button asChild size="icon">
                    <Link href="/guide">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={picture} />
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}