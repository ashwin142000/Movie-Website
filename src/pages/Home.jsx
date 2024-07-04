import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row';
import requests from '../Requests';
function Home() {
  return (
    <div>
      <Main />
      <Row title='Upcoming' fetchURL={requests.requestUpcoming}/>
      <Row title='Trending' fetchURL={requests.requestTrending}/>
      <Row title='TopRated' fetchURL={requests.requestTopRated}/>
      <Row title='Popular' fetchURL={requests.requestPopular}/>
      {/* <Row title='Horror' fetchURL={requests.requestHorror}/> */}
    </div>
  )
}

export default Home;
