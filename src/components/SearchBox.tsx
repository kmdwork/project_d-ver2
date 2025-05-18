'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type SearchBoxProps = {
    userId: string;
};

export default function SearchBox({ userId }: SearchBoxProps) {
    useEffect(() => {
        const fetchMaxBoxNum = async () => {
            const res = await fetch('/api/movie/maxDvdBoxNumber', {
                method: 'POST',
                body: JSON.stringify({ userId }),
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setTotalPages(data.maxBoxNumber)
        }
        fetchMaxBoxNum();
    }, [userId]);

    const [totalPages, setTotalPages] = useState(1);
    const dvdBoxNumbers = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());    
    const [search , setSearch] = useState('');
    const [box, setBox] = useState('');
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleSerach = () => {
        console.log(search, box);
        router.push(`/mydvdbox/dvdtable?search=${search.toString()}&box=${box.toString()}`);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>🔍</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-gray-500">検索条件</DialogTitle>
                <DialogDescription>
                    <Input
                        type="text"
                        placeholder="キーワードを入力"
                        className="w-full p-2 border rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select onValueChange={(e) => setBox(e)}>
                        <SelectTrigger className=" my-2.5">
                            <SelectValue placeholder="Select BoxNumber" />
                        </SelectTrigger>
                        <SelectContent className="w-full p-2 border rounded-md">
                            <SelectGroup>
                                <SelectLabel>Box Number</SelectLabel>
                                {dvdBoxNumbers.map((boxNumber) => (
                                    <SelectItem key={boxNumber} value={boxNumber}>
                                        {boxNumber}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                        type="button"
                        className="w-full bg-blue-600 text-white p-2 rounded-md"
                        onClick={handleSerach}
                    >
                        検索
                    </Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
