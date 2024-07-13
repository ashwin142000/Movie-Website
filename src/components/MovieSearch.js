import React from 'react';

const MovieSearch = ({movie, selectMovie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"

    return (
        <div onClick={() => selectMovie(movie)} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
            <div className="w-full h-auto block">
                {movie.poster_path &&
                <img className='w-full h-auto block' src={IMAGE_PATH + movie.poster_path} alt={movie.title}/>
                }
                <div className="flex between movie-infos">
                    <h5 className={"movie-title text-white font-bold"}>{movie.title}</h5>
                    {movie.vote_average ? <span className="movie-voting">{movie.vote_average}</span> : null}
                </div>
            </div>
        </div>
    );
};


export default MovieSearch;