'use client'

import Image from "next/image";
import { Movie } from "@/types/movie";
import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchSearchMovie } from "@/lib/tmdb";
import { updateMovie } from "@/lib/actions/updateMovie";

type PostType = {
    id: string;
    title: string;
    dvdBoxNumber: number;
    dvdNumber: number;
    watchedAt: Date | null;
    notes: string | null;
    tmdbId: number | null;
};


export default function EditForm({ post, movieData }: { post: PostType; movieData: Movie | null }) {
    const [title, setTitle] = useState('');
    const [watchedAt, setWatchedAt] = useState('');
    const [notes, setNotes] = useState('');
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [results, setResults] = useState<Movie[]>([]);
    const [tmdbId, setTmdbId] = useState<number | null>(null);
    // const [selectedMovieImage, setSelectedMovieImage] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null >(null)


    useEffect(() => {
        if (post) {
            setTitle(post.title ?? '');
            setWatchedAt(post.watchedAt ? new Date(post.watchedAt).toISOString().split('T')[0] : '');
            setNotes(post.notes ?? '');
            setTmdbId(post.tmdbId ? post.tmdbId : null);
            setSelectedMovie( movieData ? movieData : null );
        }
    }, [post, movieData])

    const handleSearchMovie = async () => {
        const movies = await fetchSearchMovie(title);
        if(movies) {
            setDetailsOpen(true);
        }
        setResults(movies);        
    }

    const handleDecision = () => {
        const selectedMovie = results.find((movie) => movie.id === selectedMovieId)
        if (selectedMovie) {
            setSelectedMovie(selectedMovie);
            setDetailsOpen(false);
            setTitle(selectedMovie.title);
            setTmdbId(selectedMovie.id);
            // setSelectedMovieImage(selectedMovie.poster_path);
        }
    }

    const [state, formAction] = useActionState(updateMovie, {
        success: false, errors: {}
    })

    return (
        <form action={formAction}>
            {state.success && (
                <p className="text-green-600">更新が成功しました！</p>
            )}
            <div className='space-y-2'>
                <Input
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Title"
                />
                <Button type='button' className='w-1/6 bg-gray-300 hover:bg-gray-200 text-gray-800 mr-5'
                    onClick={handleSearchMovie}
                >
                    Serch
                </Button>
            </div>

            <details className="w-full mx-auto" open={detailsOpen}>
                <summary className="cursor-pointer font-semibold flex justify-between items-center">
                    ⬇︎検索結果
                </summary>
            
                <div className="mt-2 space-y-4">
                    <button type="button" className="px-3 py-1 bg-blue-800 hover:bg-blue-700 text-white rounded"
                        onClick={handleDecision}
                    >決定</button>
                                
                    {results.map((movie) => (
                           <div key={movie.id} className="flex gap-3 border rounded-md p-2">
                            <Input type="radio" name='movie'
                                checked={selectedMovieId === movie.id} 
                                onChange={() => setSelectedMovieId(movie.id)}
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
            

            {selectedMovie && (
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                            alt={post.title}
                            width={300}
                            height={500}
                            className=" object-cover rounded-lg shadow-lg"
                            priority
                        />
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-lg whitespace-pre-line">{selectedMovie.overview}</p>
                    </div>
                </div>
            )}
            <Input type="hidden" name="tmdbId" value={tmdbId ? tmdbId.toString() : ''}/>
            <Input type="hidden" name="postId" value={post.id}/>


            <div className="border-t pt-6 space-y-2">
                <div className="flex justify-around">
                    <p><strong>DVD Box:</strong> {post.dvdBoxNumber}</p>
                    <p><strong>No:</strong> {post.dvdNumber}</p>
                    <p><strong>視聴日:</strong> 
                        <Input
                            type="date"
                            name="watchedAt"
                            value={watchedAt ?? ''}
                            onChange={e => setWatchedAt(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </p>
                </div>
                <p><strong>メモ:</strong>
                    <Input 
                        name="notes"
                        type="text"
                        value={notes ?? ''}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </p>
            </div>

            <div className="w-full flex justify-center mt-3">
                <Button type='submit' className=' w-1/3 bg-red-800 hover:bg-red-700 text-white'>
                    Edit DVD
                </Button>
            </div>
        </form>
    )
}
