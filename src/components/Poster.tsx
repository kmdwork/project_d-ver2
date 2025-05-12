'use client'

import { fetchPosterPath } from "@/lib/tmdb";
import Image from "next/image";
import { useEffect, useState } from "react";


type PosterProps = {
    tmdbId: number;
    alt?: string;
    width?: number;
    height?: number;
};  


export default function Poster({ tmdbId, alt = "Movie Poster", width = 50, height = 60 }: PosterProps) {
    const [posterUrl, setPosterUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!tmdbId) return;
        fetchPosterPath(tmdbId)
          .then(url => {
            setPosterUrl(url);
          })
          .catch(err => {
            console.error(err);
            setPosterUrl(null);
          });
    }, [tmdbId]);
    
    if (!posterUrl) {
        return <div >Loading...</div>;
    }

    return (
        <Image
          src={posterUrl}
          alt={alt}
          width={width}
          height={height}
          style={{ objectFit: "cover", borderRadius: "8px" }}
          loading="lazy"
        />
    );
}
