'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
// import DeletePostDialog from "@/components/post/DeletePostDialog"
import { useState } from "react";
import DeleteDvdDialog from "../DeleteDvdDialog";


export default function TableDropdownMenu({itemId}: {itemId: string}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    
    const handleDeleteDialogChange = (open: boolean) => {
        setShowDeleteDialog(open)
        if(!open) {
            setIsDropdownOpen(false)
        }
    }

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger className="px-2 py-1 border rounded-md">⋯
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-gray-400">
                    <DropdownMenuItem asChild>
                        <Link href={`/mydvdbox/${itemId}/MovieInformation`} className="cursor-pointer">詳細</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/mydvdbox/${itemId}/MovieInformationEdit`} className="cursor-pointer">編集</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className="text-red-600 cursor-pointer"
                        onSelect={() => {
                            setIsDropdownOpen(false)
                            setShowDeleteDialog(true)
                        }}
                    >
                        削除
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>  
            { showDeleteDialog && (
                <DeleteDvdDialog
                    itemId={itemId} 
                    isOpen={showDeleteDialog}
                    onOpenChange={handleDeleteDialogChange}
                />
            )}
        </>
    )
}
