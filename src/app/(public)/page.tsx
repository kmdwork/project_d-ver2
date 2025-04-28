import PopularMovies from "@/components/PopularMovies";
import { fetchPopularMovies } from "@/lib/tmdb";
import { Movie } from "@/types/movie";


export default async function HomePage() {
    const movieDatas = await fetchPopularMovies() as Movie[];    

    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-black">
        {/* 左上にLoginとSignupボタン */}
        <div className="absolute top-0 left-0 m-4 flex gap-x-4">
          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition">
            Login
          </button>
          <button className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition">
            Signup
          </button>
        </div>

        {/* スライドショーエリア */}
        <PopularMovies movieDatas={movieDatas} />

        {/* Go DVDTableボタン */}
        <div className="mt-8">
          <button className="px-6 py-3 bg-red-800 text-white text-lg rounded hover:bg-red-700 transition">
            Go DVDTable
          </button>
        </div>
      </div>
    );
}
