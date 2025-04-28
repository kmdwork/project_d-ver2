'use client'

import { Movie } from "@/types/movie";
import Image from "next/image";

type PopularMoviesProps = {
    movieDatas: Movie[];
};


export default function PopularMovies({movieDatas}: PopularMoviesProps) {
    
    return (
        <div className="w-full max-w-md overflow-hidden rounded-lg shadow-lg bg-gray-800">
            {movieDatas.map((movie) => (
                <div key={movie.id}>
                    <Image 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={500}    // 幅を指定 (適切なサイズを指定)
                        height={750}   // 高さを指定 (適切なサイズを指定)
                        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-auto object-cover"
                        priority
                    /> 
                </div>
            ))}
        </div>
    )
}
