import React, { useEffect, useState } from 'react';
import './app.css';
import VideoList from './Components/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',  
      redirect: 'follow'
    };
    
    fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyBsDnlq13z2o_dUh2XuG7dpP4IIufr-ipk", requestOptions)
      .then(response => response.json())  //response를 텍스트로 변환
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);
  return (
    <React.Fragment>
      <VideoList videos={videos}/>
    </React.Fragment>
  );
}

export default App;
