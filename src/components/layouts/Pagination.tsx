import Link from "next/link";

type PaginationProps = {
    currentPage: number;
    limit: number;
    count: number;
};

export default function Pagination({
    currentPage,
    limit,
    count
}:
    PaginationProps
) {

    const totalPages = Math.ceil(count / limit);
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    const path = '/mydvdbox/dvdtable';

    return (
        <div className="flex gap-2">
            <Link href={`${path}?page=${currentPage - 1}`} aria-label="Previous Page">
                <button
                className={`px-2 py-1 border rounded ${
                    currentPage === 1 || count < limit ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={currentPage === 1}
                >
                ＜
                </button>
            </Link>

            {pageNumbers.map((number) => (
                <Link key={number} href={`${path}?page=${number}`}>
                <button
                    className={`px-2 py-1 border rounded ${
                    currentPage === number ? 'bg-indigo-500 text-white' : ''
                    }`}
                >
                    {number}
                </button>
                </Link>
            ))}

            <Link href={`${path}?page=${currentPage + 1}`} aria-label="Next Page">
                <button
                className={`px-2 py-1 border rounded ${
                    currentPage === totalPages || count < limit ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={currentPage === totalPages}
                >
                ＞
                </button>
            </Link>
        </div>
    )
}
