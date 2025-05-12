import { auth } from "@/auth";
import { getOwnDVDdata } from "@/lib/ownDVDdata";
import { fetchMovieData } from "@/lib/tmdb";
import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
    params: Promise<{id: string}>
}


export default async function MovieInformationPage({ params }: Params) {
    const session = await auth();
    const userId = session?.user?.id;
    if(!session?.user?.email || !userId) {
        throw new Error('不正なリクエストです')
    }

    const { id } = await params;
    const post = await getOwnDVDdata(userId, id);
    if(!post) {
        notFound();
    }
    let movieData = null;
    if (post.tmdbId !== null) {
        movieData = await fetchMovieData(post.tmdbId) as Movie;
    }


  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <div>
        <Link href="/mydvdbox/dvdtable" className="text-blue-600 hover:underline">
          ← 戻る
        </Link>
      </div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {movieData && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={post.title}
              width={300}
              height={500}
              className=" object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg whitespace-pre-line">{movieData.overview}</p>
          </div>
        </div>
      )}

      <div className="border-t pt-6 space-y-2">
        <div className="flex justify-around">
            <p><strong>DVD Box:</strong> {post.dvdBoxNumber}</p>
            <p><strong>No:</strong> {post.dvdNumber}</p>
            <p><strong>視聴日:</strong> {post.watchedAt ? new Date(post.watchedAt).toLocaleDateString() : '未視聴'}</p>
        </div>
        {post.notes && (
          <p><strong>メモ:</strong> {post.notes}</p>
        )}
      </div>
    </div>
  )
}
