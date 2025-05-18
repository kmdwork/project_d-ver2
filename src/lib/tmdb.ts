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

// DVDTableでポスター画像を取得
export async function fetchPosterPath(tmdbId: number): Promise<string | null> {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!apiKey) {
      throw new Error('TMDB API Key is missing');
    }
  
    const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=en`);
    // 日本のポスターにしたい場合は language=ja-JP
    if (!res.ok) {
      console.error(`Failed to fetch poster for tmdbId ${tmdbId}`);
      return null;
    }
  
    const data = await res.json();
    // console.log(data);
    
    if (data.poster_path) {
      return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    } else {
      return null;
    }
}


// 詳細画面で映画情報(1つ)を取得
export async function fetchMovieData(tmdbId: number): Promise<Movie> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('TMDB API Key is missing');
  }

  const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=ja-JP`);
  // 日本のポスターにしたい場合は language=ja-JP
  if (!res.ok) {
    throw new Error('Failed to fetch popular movies');
  }

  const data = await res.json();
  return data as Movie;
}



// 登録画面で映画の候補を取得
export async function fetchSearchMovie(query: string) {
    if (!query) return []
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
    if (!apiKey) {
      throw new Error('TMDB API Key is missing');
    }
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ja&query=${encodeURIComponent(query)}`)
    if (!res.ok) {
      console.error('TMDB API error:', res.statusText)
      return []
    }
  
    const data = await res.json()
    return data.results || []
}


