import { Movie } from "@/types/movie";

// Home画面、人気映画の取得
export async function fetchPopularMovies(): Promise<Movie[]> {
    const apiKey = process.env.TMDB_API_KEY;
    if(!apiKey) {
        throw new Error('TMDB API Key is missing');
    }

    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en&page=1`);
    // 日本のポスターにしたい場合は language=ja-JP
    if(!res.ok) {
        throw new Error('Failed to fetch popular movies');
    }
    const data = await res.json();
    return data.results || [];
}