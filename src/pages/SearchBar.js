import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Row from '../components/Row';
import requests from '../Requests';
import Movie from '../components/Movie';
import { query } from 'firebase/firestore';

const SearchBar = () => {
  const MOVIE_API= "https://api.themoviedb.org/3/";
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie"
  const API_KEY = "43ee128f34b5f49403606c190e501ab0"
  const [searchKey,setSearchKey]=useState("");
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (event)=>{
    if (event){
      event.preventDefault()
    }
   
    const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`,{
      params:{
        api_key:API_KEY,
        query: searchKey
      }
    })
    setMovies(data.results)
  }

  useEffect(() => {
    fetchMovies()
  }, []);

  const searchMovies = (e) =>{
    e.preventDefault();

  }

  return (
    <div className='w-full h-screen'>
        <div className='absolute top-[10%] flex items-center p-4 md:p-8'>
          <form className='form' onSubmit={fetchMovies}>
          <input className='p-2 rounded opacity-50 hover:opacity-80 bg-gray-800 w-[300px] text-white' placeholder='Search Movies and TV Shows'
                 onChange={(event) => setSearchKey(event.target.value)}>

          </input>
          <button className='text-white bg-gray-600 p-2 rounded' type={"submit"}>Search</button>
          </form>
        </div>
        <div
          className='w-full top-[30%] h-full relative items-center p-20'
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
      </div>


  )
}

export default SearchBar
