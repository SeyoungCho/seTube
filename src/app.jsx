import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchAppBar from './Components/mui_components/search_app_bar';
import VideoList from './Components/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
    
    const search = ()=>{ //입력된 query를 가지고 search list get요청하는 함수
      
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchInput}&type=video&key=AIzaSyBsDnlq13z2o_dUh2XuG7dpP4IIufr-ipk`, requestOptions)
      .then(response => response.json())
      .then(result=>result.items.map(item=>
        ({...item, id: item.id.videoId})))
      .then(items =>setVideos(items))
      .catch(error => console.log('error', error));
    setSearchInput("");
    
  };

  return (
    <React.Fragment>
     <div className={styles.app}>
        <SearchAppBar 
          searchInput={searchInput} 
          setSearchInput={setSearchInput}
          onSearch={search}
        />
        <VideoList videos={videos}/>
     </div>
    </React.Fragment>
  );
}

export default App;
