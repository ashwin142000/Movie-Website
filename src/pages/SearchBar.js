// import React,{useState,useEffect} from 'react';
// import axios from 'axios';
// import Row from '../components/Row';
// import requests from '../Requests';
// import Movie from '../components/Movie';
// import { query } from 'firebase/firestore';
// import YouTube from 'react-youtube';
// import MovieSearch from '../components/MovieSearch';

// const SearchBar = () => {
//   const MOVIE_API= "https://api.themoviedb.org/3/";
//   const SEARCH_API = MOVIE_API + "search/movie"
//   const DISCOVER_API = MOVIE_API + "discover/movie"
//   const API_KEY = "43ee128f34b5f49403606c190e501ab0"
//   const [searchKey,setSearchKey]=useState("");
//   const [movies, setMovies] = useState([]);
//   const [movie, setMovie] = useState({title: "Loading Movies"})
//   const [playing, setPlaying] = useState(false)
//   const [trailer, setTrailer] = useState(null)

//   const fetchMovies = async (event)=>{
//     if (event){
//       event.preventDefault()
//     }
   
//     const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`,{
//       params:{
//         api_key:API_KEY,
//         query: searchKey
//       }
//     })
//     setMovies(data.results)
//     setMovie(data.results[0])
//     if (data.results.length) {
//       await fetchMovie(data.results[0].id)
//     }
//   }

//   const fetchMovie = async (id) => {
//     const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
//         params: {
//             api_key: API_KEY,
//             append_to_response: "videos"
//         }
//     })

//     if (data.videos && data.videos.results) {
//         const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
//         setTrailer(trailer ? trailer : data.videos.results[0])
//     }

//     setMovie(data)
// }


//   useEffect(() => {
//     fetchMovies()
//   }, []);

//   const selectMovie = (movie) => {
//     fetchMovie(movie.id)
//     setPlaying(false)
//     setMovie(movie)
//     window.scrollTo(0, 0)
// }

// const renderMovies = () => (
//     movies.map(movie => (
//         <MovieSearch
//             selectMovie={selectMovie}
//             key={movie.id}
//             movie={movie}
//         />
//     ))
// )


//   return (
//     <div className='w-full h-screen'>
//         <div className='absolute top-[10%] flex items-center p-4 md:p-8'>
//           <form className='form' onSubmit={fetchMovies}>
//           <input className='p-2 rounded opacity-50 hover:opacity-80 bg-gray-800 w-[300px] text-white' placeholder='Search Movies and TV Shows'
//                  onChange={(event) => setSearchKey(event.target.value)}>

//           </input>
//           <button className='text-white bg-gray-600 p-2 rounded' type={"submit"}>Search</button>
//           </form>
//         </div>
        
//         <div className='w-full top-36 relative flex items-center text-white'>
//           <YouTube/>
//         </div>
//         <div
//           className='w-full top-3/4 h-full relative items-center p-20'
//         >
//           {renderMovies()}
//         </div>
//       </div>


//   )
// }

// export default SearchBar



import {useEffect, useState} from "react"
import '../App.css'
import axios from 'axios'
import MovieSearch from "../components/MovieSearch"
import Youtube from 'react-youtube'

function SearchBar() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "43ee128f34b5f49403606c190e501ab0"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        console.log(data.results[0])
        setMovies(data.results)
        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <MovieSearch
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )

    return (
        <div className="App">
            <div className='absolute top-[10%] flex items-center p-4 md:p-8'>
           <form className='form' onSubmit={fetchMovies}>
           <input className='p-2 rounded opacity-50 hover:opacity-80 bg-gray-800 w-[300px] text-white' placeholder='Search Movies and TV Shows'
                  onChange={(event) => setSearchKey(event.target.value)}>

           </input>
           <button className='text-white bg-gray-600 p-2 rounded' type={"submit"}>Search</button>
           </form>
         </div >
            {movies.length ?
                <div>
                    {movie ?
                        <div className="relative w-full top-36 h-[600px]"
                             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                              <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        className="absolute left-0 right-0 bottom-0 top-0 w-full h-full"
                                        containerClassName=""
                                        opts={
                                            {
                                                width: "100%",
                                                height: "100%",
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    <button onClick={() => setPlaying(false)} className="absolute z-[2] bottom-2 left-2 border text-white border-gray-300 py-2 px-5 ml-3">Close
                                    </button>
                                </> :
                                <div className="max-w-full top-20 relative p-6 text-white">
                                    <div className="absolute w-full top-[20%] p-4 md:p-8">
                                    <h1 className="text-3xl md:text-5xl font-bold text-white">{movie.title}</h1>
                                    <div className="my-4">
                                        {trailer ?
                                            <button className="border text-black bg-gray-300 border-gray-300 py-2 px-5 font-bold" onClick={() => setPlaying(true)}
                                                    type="button">Play
                                                </button>
                                            : 'Sorry, no trailer available'}
                                        <button className='border font-bold text-white border-gray-300 py-2 px-5 ml-3'>Watch Later</button>
                                        </div>
                                        <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
                                        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">{movie.overview}</p>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}

                    <div className="w-full top-20 h-full relative items-center p-20">
                        {renderMovies()}
                    </div>
                </div>
                : 'Sorry, no movies found'}
        </div>
    );
}

export default SearchBar;