import { auth } from "@/auth"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Setting from "./Setting";


export default async function PrivateHeader() {
    const session = await auth();
    if(!session?.user?.email) throw new Error('不正なリクエストです'); 

    return (
        <header className="border-b border-gray-700 bg-red-900">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/dashboard" passHref className="font-bold text-xl text-white hover:text-gray-300 transition">
                                - DVDTable -
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Setting session={session} />
            </div>
        </header>  
    )
}
