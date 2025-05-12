import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { deleteMovie } from "@/lib/actions/deleteMovie";
// import { deletePost } from "@/lib/actions/deletePost";

type deletePostProps = {
    itemId: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteDvdDialog({itemId, isOpen, onOpenChange}: deletePostProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-gray-700">
                <AlertDialogHeader>
                    <AlertDialogTitle>記事の削除</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                        削除してもよろしいですか？
                        <br />
                        この操作は取り消せません。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className="text-gray-700">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    onClick={() => deleteMovie(itemId)} 
                    className="bg-red-500 hover:bg-red-600"
                >
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
