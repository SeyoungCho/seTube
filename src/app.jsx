import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchAppBar from './Components/mui_components/search_app_bar';
import VideoList from './Components/video_list/video_list';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
    youtube
      .mostPopular()
      .then(videos=>setVideos(videos));
  }, []);
    
  const search = ()=>{ //입력된 query를 가지고 search list get요청하는 함수
    youtube
      .search(searchInput)
      .then(videos=>setVideos(videos));
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
