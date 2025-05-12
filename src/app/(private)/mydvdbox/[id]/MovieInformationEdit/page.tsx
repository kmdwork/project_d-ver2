import EditForm from "@/components/EditForm";
import Link from "next/link";
import { auth } from "@/auth";
import { getOwnDVDdata } from "@/lib/ownDVDdata";
import { fetchMovieData } from "@/lib/tmdb";
import { Movie } from "@/types/movie";
import { notFound } from "next/navigation";

type Params = {
    params: Promise<{id: string}>
}

export default async function MovieInformationEditPage({ params }: Params) {
    const { id } = await params;
    const session = await auth();
    const userId = session?.user?.id;
    if(!session?.user?.email || !userId) {
        throw new Error('不正なリクエストです')
    }
    
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
      <EditForm post={post} movieData={movieData} />
    </div>
  )
}
