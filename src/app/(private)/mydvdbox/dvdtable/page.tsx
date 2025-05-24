import { auth } from "@/auth";
import Pagination from "@/components/layouts/Pagination";
import TableDropdownMenu from "@/components/layouts/TableDropdownMenu";
import Poster from "@/components/Poster";
import SearchBox from "@/components/SearchBox";
import { Button } from "@/components/ui/button";
import { getOwnAnyDVDdata, getSearchDVDdata } from "@/lib/ownDVDdata";
import Link from "next/link";

export default async function DVDTablePage({
        searchParams
    }: {
        searchParams: Promise<{ page?: string; search?: string; box?: string }>
    }) {

    const session = await auth();
    const userId = session?.user?.id;
    if(!session?.user?.email || !userId) {
      throw new Error('不正なリクエストです')
    }

    const params = await searchParams;

    const page = parseInt(params.page || "1", 10);
    const search = params.search || "";
    const box = params.box || "";

    const hasSearchConditions = search || box;

    const data = hasSearchConditions
        ? await getSearchDVDdata({ userId, search, box})
        : await getOwnAnyDVDdata(userId);
    // const data = await getOwnAnyDVDdata(userId);

    const limit = 20;
    const offset = (page - 1) * limit;
    const paginatedData = data.slice(offset, offset + limit);

  return (
    <div className="p-4">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Movie 一覧</h1>
            <div>
                <Button className="bg-gray-800 hover:bg-gray-400 text-white mr-1">
                    <Link href="/mydvdbox/dvdregistration">
                        新規登録
                    </Link>
                </Button>
                <SearchBox 
                    userId={userId}
                />
            </div>
        </div>
        <div className="overflow-x-auto sm:overflow-x-visible">
            <table className="table-fixed w-full border-collapse border">
                <thead>
                    <tr className="bg-red-900 text-white">
                    <th className="border p-2 text-center sm:w-[7%] hidden sm:table-cell">Poster</th>
                    <th className="border p-2 text-center sm:w-[44%] w-[160px]">Title</th>
                    <th className="border p-2 text-center sm:w-[9%] w-[110px]">BoxNumber</th>
                    <th className="border p-2 text-center sm:w-[9%] w-[110px]">Number</th>
                    <th className="border p-2 text-center sm:w-[25%] hidden sm:table-cell">Notes</th>
                    <th className="border p-2 text-center sm:w-[6%] w-[50px]">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr className="h-24" key={item.id}>
                            <td className="border p-2 text-center sm:flex justify-center h-24 hidden ">
                                {item.tmdbId ? (<Poster alt={item.title} tmdbId={item.tmdbId} />) : (<div className="flex items-center">no image</div>) }
                            </td>
                            <td className="border p-2 text-center">{item.title}</td>
                            <td className="border p-2 text-center">{item.dvdBoxNumber}</td>
                            <td className="border p-2 text-center">{item.dvdNumber}</td>
                            <td className="border p-2 text-center hidden sm:table-cell">{item.notes}</td>
                            <td className="border p-2 text-center">
                                <TableDropdownMenu itemId={item.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-4 flex justify-center">
            <Pagination
                currentPage={page}
                limit={limit}
                count={data.length}
            />
        </div>
    </div>
  )
}
