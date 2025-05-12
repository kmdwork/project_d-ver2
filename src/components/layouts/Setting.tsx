import { Session } from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Link from "next/link";



export default function Setting({session}: {session: Session} ) {
    const handleLogout = async () => {
        'use server'
        await signOut();
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer bg-white">
                    <Button variant="ghost" className="font-medium text-gray-800">
                        {session.user?.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 ">
                    <DropdownMenuItem className="cursor-pointer">
                        <Link href='/mydvdbox/dvdregistration'>DVDRregistration</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link href='/mydvdbox/dvdtable'>DVDTAble</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-500">
                        ログアウト
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}