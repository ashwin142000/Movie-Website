import axios from 'axios';
import React,{useEffect,useState} from 'react';
import requests from '../Requests';
import Youtube from 'react-youtube';

function Main({state}) {
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const API_KEY = "43ee128f34b5f49403606c190e501ab0";

  const [playing,setPlaying] = useState(false);
  const [trailer,setTrailer] = useState(null);
  const [movie, setMovie] = useState({title: "Loading Movies"});

  

  // const truncateString = (str, num) => {
  //   if (str?.length > num) {
  //     return str.slice(0, num) + '...';
  //   } else {
  //     return str;
  //   }
  // };
  return (
    <div className='w-full h-[600px] text-white'>
      <div className='w-full h-full'>
      <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
        <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${state?.backdrop_path}`} alt={state?.title} />
      
      <div className='absolute w-full top-[20%] p-4 md:p-8'>
      <h1 className='text-3xl md:text-5xl font-bold'>{state?.title}</h1>
      <div className='my-4'>
        
        <button onClick={()=>setPlaying(true)} className='border text-black bg-gray-300 border-gray-300 py-2 px-5 font-bold'>Play</button>
        <button className='border font-bold text-white border-gray-300 py-2 px-5 ml-3'>Watch Later</button>
      </div>
      <p className='text-gray-400 text-sm'>Released: {state?.release_date}</p>
      <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
            {state?.overview}
          </p>
      </div>
      </div>
    </div>
  )
}

export default Main;
