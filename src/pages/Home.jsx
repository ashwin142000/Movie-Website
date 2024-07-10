import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row';
import requests from '../Requests';
function Home() {
  return (
    <div>
      <Main />
      <Row title='Upcoming' fetchURL={requests.requestUpcoming} rowID='1' />
      <Row title='Trending' fetchURL={requests.requestTrending} rowID='2' />
      <Row title='TopRated' fetchURL={requests.requestTopRated} rowID='3'/>
      <Row title='Popular' fetchURL={requests.requestPopular} rowID='4'/>
      {/* <Row title='Horror' fetchURL={requests.requestHorror}/> */}
    </div>
  )
}

export default Home;
