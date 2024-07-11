import React, { useState ,useEffect} from 'react'
import Main from '../components/Main'
import Row from '../components/Row';
import requests from '../Requests';
import axios from 'axios';
function Home() {
  const movie = Math.floor(Math.random()*20);
  const [state,setState]=useState([]);
  useEffect(()=>{
    axios.get(requests.requestTopRated).then((response)=>{
      setState(response.data.results[movie])
    });
  },[]);

  return (
    <div>
      <Main state={state} />
      <Row setState={setState} title='Upcoming' fetchURL={requests.requestUpcoming} rowID='1' />
      <Row setState={setState} title='Trending' fetchURL={requests.requestTrending} rowID='2' />
      <Row setState={setState} title='TopRated' fetchURL={requests.requestTopRated} rowID='3'/>
      <Row setState={setState} title='Popular' fetchURL={requests.requestPopular} rowID='4'/>
      {/* <Row title='Horror' fetchURL={requests.requestHorror}/> */}
    </div>
  )
}

export default Home;
