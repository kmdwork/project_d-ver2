import { Session } from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";



export default function Setting({session}: {session: Session} ) {
    const handleLogout = async () => {
        'use server'
        await signOut();
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer bg-white">
                    <Button variant="ghost" className="font-medium">
                        {session.user?.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 ">
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        ログアウト
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}