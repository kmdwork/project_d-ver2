'use client'

import { Movie } from "@/types/movie";
import Image from "next/image";
import { useEffect, useState } from "react";

type PopularMoviesProps = {
    movieDatas: Movie[];
};


export default function PopularMovies({movieDatas}: PopularMoviesProps) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? movieDatas.length - 3 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === movieDatas.length - 3 ? 0 : prevIndex + 1
        );
    };

    // 自動でスライドを切り替える処理
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 10000); // 10秒ごとに次のスライドに切り替え

        // クリーンアップ
        return () => clearInterval(interval);
    }, [movieDatas.length]);
    
    return (
        <div className="mt-15 relative w-4/5 mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-800">
            <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100 / 3}%)`,
                }}
            >
                {movieDatas.map((movie) => (
                    <div 
                        key={movie.id}
                        className="flex-none w-full sm:w-1/3 px-2"
                        style={{
                            transition: 'transform 0.5s ease-in-out',
                        }}
                    >
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
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 bg-black bg-opacity-50 text-white rounded-full"
            >
                ＜
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 bg-black bg-opacity-50 text-white rounded-full"
            >
                ＞
            </button>
        </div>
    )
}
