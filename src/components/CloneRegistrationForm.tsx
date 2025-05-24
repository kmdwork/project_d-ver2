'use client'

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { fetchSearchMovie } from '@/lib/tmdb';
import Image from 'next/image';
import { Movie } from '@/types/movie';

type CloneRegistrationFormProps = {
    formId: number;
    onRemove?: () => void;
};


export default function CloneRegistrationForm({formId, onRemove}: CloneRegistrationFormProps ) {
    
    const [query_formId, setQuery_formId] = useState('');
    const [tmdbId_formId, setTmdbId_formId] = useState('');
    const [results_formId, setResults_formId] = useState<Movie[]>([]);
    const [selectedMovieId_formId, setSelectedMovieId_formId] = useState<number | null>(null);
    const [selectedMovieImage_formId, setSelectedMovieImage_formId] = useState('');
    const [detailsOpen_formId, setDetailsOpen_formId] = useState(false);

    const handleSearchMovie = async () => {
        const movies = await fetchSearchMovie(query_formId);
        if(movies) {
            setDetailsOpen_formId(true);
        }
        setResults_formId(movies);        
    }

    const handleDecision = () => {
        const selectedMovie = results_formId.find((movie) => movie.id === selectedMovieId_formId)
        if (selectedMovie) {
            const movieTitle = (selectedMovie.title == selectedMovie.original_title) ? selectedMovie.title: `${selectedMovie.title}(${selectedMovie.original_title})`;
            setDetailsOpen_formId(false);
            setQuery_formId(movieTitle);
            setTmdbId_formId(String(selectedMovie.id));
            setSelectedMovieImage_formId(selectedMovie.poster_path);
        }
    }

    return (
        <div
            className={onRemove ? "mt-4 border-t-4 border-double border-gray-400" : ""}
        >
            {onRemove && (
                <div className="flex justify-end mt-2">
                    <button
                        type="button"
                        onClick={onRemove}
                        className="border border-red-500 rounded px-1  text-red-500 hover:text-red-300 hover:border-red-300"
                    >
                    ✕
                    </button>
              </div>
            )}
            <div className='space-y-2'>
                <Label htmlFor={`title-${formId}`} className="text-white">Title</Label>
                <Input id={`title-${formId}`} type='text' name={`title-${formId}`} required className="bg-gray-700 text-white border border-gray-600" 
                    value={query_formId}
                    onChange={(e) => setQuery_formId(e.target.value)}
                />
                <Button type='button' className='w-1/6 bg-gray-300 hover:bg-gray-200 text-gray-800 mr-5'
                    onClick={handleSearchMovie}
                >
                    Serch
                </Button>
            </div>
            <details className="w-full mx-auto" open={detailsOpen_formId}>
                <summary className="cursor-pointer font-semibold flex justify-between items-center">
                    ⬇︎検索結果
                </summary>

                <div className="mt-2 space-y-4">
                    <button type="button" className="px-3 py-1 bg-blue-800 hover:bg-blue-700 text-white rounded"
                        onClick={handleDecision}
                    >決定</button>
                    
                    {results_formId.map((movie) => (
                        <div key={movie.id} className="flex gap-3 border rounded-md p-2">
                            <Input type="radio" name={`movie-${formId}`}
                                checked={selectedMovieId_formId === movie.id} 
                                onChange={() => setSelectedMovieId_formId(movie.id)}
                            />
                            {movie.poster_path ? (
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    width={500}
                                    height={750}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-[500px] h-[750px] bg-gray-700 flex items-center justify-center text-white">
                                    No Image
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold">{movie.title}</h3>
                                <p className="text-sm text-gray-300">{movie.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </details>
            <div className='space-y-2'>
                <Label htmlFor={`dvdBoxNumber-${formId}`} className="text-white">DVD Box Number</Label>
                <Input id={`dvdBoxNumber-${formId}`} type='number' name={`dvdBoxNumber-${formId}`} required className="bg-gray-700 text-white border border-gray-600" />
            </div>
            <div className='space-y-2'>
                <Label htmlFor={`notes-${formId}`} className="text-white">Notes</Label>
                <Input id={`notes-${formId}`} type='text' name={`notes-${formId}`} className="bg-gray-700 text-white border border-gray-600" />
            </div>
            <div className='space-y-2'>
                <Label htmlFor={`watchedAt-${formId}`} className="text-white">Watched At</Label>
                <Input
                    id={`watchedAt-${formId}`}
                    type="date"
                    name={`watchedAt-${formId}`}
                    className="bg-gray-700 text-white border border-gray-600 w-3/5 sm:w-1/4"
                />
            </div>
            <div className='flex items-center justify-around mt-1'>
                {selectedMovieImage_formId && (
                    <Image 
                        src={`https://image.tmdb.org/t/p/w500${selectedMovieImage_formId}`}
                        alt={query_formId}
                        width={300}    // 幅を指定 (適切なサイズを指定)
                        height={500}   // 高さを指定 (適切なサイズを指定)
                            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className=" object-cover"
                        priority
                    /> 
                )}
                {tmdbId_formId && (<div>TMDB ID:{tmdbId_formId}</div>)}
                <Input id={`tmdbId-${formId}`} type='hidden' name={`tmdbId-${formId}`} value={tmdbId_formId} />
            </div>
        </div>
    )
}
