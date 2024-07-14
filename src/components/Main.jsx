import axios from 'axios';
import React,{useEffect,useState} from 'react';
import requests from '../Requests';
import Youtube from 'react-youtube';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

function Main({state, trailer,playing, setPlaying}) {
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const API_KEY = "43ee128f34b5f49403606c190e501ab0";
  const [watchLater,setWatchLater] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  const saveWatchLater = async () => {
    if (user?.email) {
      setWatchLater(true);
      await updateDoc(movieID, {
        watchLaterShows: arrayUnion({
          id: state.id,
          title: state.title,
          img: state.backdrop_path,
        }),
      });
      alert("Successfully Added to Watchlist")
    } else {
      alert('Log in to add movie to WatchList');
    }
  };

  const handlePlay = () => {
    setPlaying(true);
  }
  
  return (
    <div className='w-full h-[600px] text-white'>
      
      {state ?
      <div className='w-full h-full'>
      <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
        <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${state?.backdrop_path}`} alt={state?.title} />
        {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        className="absolute left-0 right-0 bottom-0 top-1 w-full h-full"
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
                                    <div className="absolute w-full top-[20%] p-4 md:p-8">
                                    <h1 className="text-3xl md:text-5xl font-bold text-white">{state.title}</h1>
                                    <div className="my-4">
                                        {trailer ?
                                            <button className="border text-black bg-gray-300 border-gray-300 py-2 px-5 font-bold" onClick={handlePlay}
                                                    type="button">Play
                                                </button>
                                            : 'Sorry, no trailer available'}
                                        <button onClick={saveWatchLater} className='border font-bold text-white border-gray-300 py-2 px-5 ml-3'>Watch Later</button>
                                        </div>
                                        <p className='text-gray-400 text-sm'>Released: {state?.release_date}</p>
                                        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">{state.overview}</p>
                                    </div>
                                
                            }
                            </div>
                            :null
}
      </div>
    
  )
}

export default Main;
