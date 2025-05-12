import { prisma } from "@/lib/prisma";

export async function getOwnAnyDVDdata(userId: string) {
    return await prisma.movie.findMany({
        where: {
            authorId: userId
        },
        select: {
            id: true,
            title: true,
            tmdbId: true,
            dvdBoxNumber: true,
            dvdNumber: true,
            notes: true,
        },
        orderBy: [
            { dvdBoxNumber: 'asc' },
            { dvdNumber: 'asc' }
        ]
    })
}

export async function getOwnDVDdata(userId: string, MovieId: string) {
    return await prisma.movie.findFirst({
        where: {
            AND: [
                {authorId: userId},
                {id: MovieId}
            ]
        },
        select: {
            id: true,
            title: true,
            tmdbId: true,
            dvdBoxNumber: true,
            dvdNumber: true,
            watchedAt: true,
            notes: true,
        }
    })
}

export async function getSearchDVDdata({
    userId,
    search,
    box
}: {
    userId: string;
    search: string;
    box: string;
}) {
    const decodedSearch = decodeURIComponent(search);
    const normalizedSearch = decodedSearch.replace(/[\s　]+/g, ' ').trim();
    const searchWords = normalizedSearch.split(' ').filter(Boolean);

    const filters = searchWords.map((word) => ({
        OR : [
            {title: { contains: word }},
            {notes: { contains: word }},
        ]
    }))

    return await prisma.movie.findMany({
        where: {
            authorId: userId,
            // dvdBoxNumber: box ? Number(box) : undefined,
            ...(box ? { dvdBoxNumber: Number(box) } : {}),
            AND: filters,
        },
        select: {
            id: true,
            title: true,
            tmdbId: true,
            dvdBoxNumber: true,
            dvdNumber: true,
            notes: true,
        },
        orderBy: [
            { dvdBoxNumber: 'asc' },
            { dvdNumber: 'asc' }
        ]
    })
}