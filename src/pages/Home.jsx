import React, { useState ,useEffect} from 'react'
import Main from '../components/Main'
import Row from '../components/Row';
import requests from '../Requests';
import axios from 'axios';
function Home() {
    const [state,setState]=useState([]);
    const [trailer, setTrailer] = useState(null)
    const [playing,setPlaying] = useState(false);
    const [movies, setMovies] = useState([])
    const MOVIE_API = "https://api.themoviedb.org/3/";
    const API_KEY = "43ee128f34b5f49403606c190e501ab0";
    const DISCOVER_API = MOVIE_API + "discover/movie"
  useEffect(()=>{
    fetchMovies()     
  },[]);
const fetchMovies = async (event) => {
  if (event) {
      event.preventDefault()
  }
  const {data} = await axios.get(`${DISCOVER_API}`, {
    params: {
        api_key: API_KEY,
    }
})

console.log(data.results[0])
setState(data.results[0])

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

  setState(data)
  console.log(data)
}

  return (
    <div>
      <Main state={state} trailer={trailer} playing={playing} setPlaying={setPlaying}/>
      <Row setState={setState} setPlaying={setPlaying} title='Upcoming' fetchURL={requests.requestUpcoming} rowID='1' />
      <Row setState={setState} setPlaying={setPlaying} title='Trending' fetchURL={requests.requestTrending} rowID='2' />
      <Row setState={setState} setPlaying={setPlaying} title='TopRated' fetchURL={requests.requestTopRated} rowID='3'/>
      <Row setState={setState} setPlaying={setPlaying} title='Popular' fetchURL={requests.requestPopular} rowID='4'/>
      {/* <Row title='Horror' fetchURL={requests.requestHorror}/> */}
    </div>
  )
}

export default Home;
