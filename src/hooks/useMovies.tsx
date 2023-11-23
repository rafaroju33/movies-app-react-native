import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDBNowPlaying as MovieDBResponse } from "../interfaces/movieInterface";

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];

}

export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    })
    

    const getMovies = async() => {
        const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');
        const popularPromise    = movieDB.get<MovieDBResponse>('/popular');
        const topRatedPromise   = movieDB.get<MovieDBResponse>('/top_rated');
        const upcomingPromise   = movieDB.get<MovieDBResponse>('/upcoming');

        const resps = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise])

        setMoviesState({
            nowPlaying: resps[0].data.results, 
            popular: resps[1].data.results, 
            topRated: resps[2].data.results, 
            upcoming: resps[3].data.results
        });

        setIsLoading(false);
    }
    
    useEffect(() => {
        //now_playing
        getMovies();
      }, [])

    return {
        ...moviesState,
        isLoading
    }
}

//*****
//La vieja forma haciendo las peticiones a cada endpoint y llenando diversos states
//*****

// export const useMovies = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [peliculasEnCine, setPeliculasEnCine] = useState<Movie[]>([])
//     const [peliculasPopulares, setPeliculasPopulares] = useState<Movie[]>([])

//     const getMovies = async() => {
//         const respNowPlaying = await movieDB.get<MovieDBResponse>('/now_playing');
//         const respPopular = await movieDB.get<MovieDBResponse>('/popular');
//         await movieDB.get<MovieDBResponse>('/top_rated');
//         await movieDB.get<MovieDBResponse>('/upcoming');

//         setPeliculasEnCine(respNowPlaying.data.results);
//         setPeliculasPopulares(respPopular.data.results);
//         setIsLoading(false);
//     }
    
//     useEffect(() => {
//         //now_playing
//         getMovies();
//       }, [])

//     return {
//         peliculasEnCine,
//         peliculasPopulares,
//         isLoading
//     }
// }
