import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchAppBar from './Components/mui_components/search_app_bar';
import VideoDetail from './Components/video_detail/video_detail';
import VideoList from './Components/video_list/video_list';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(()=>{
    youtube
      .mostPopular()
      .then(videos=>setVideos(videos));
  }, []);
    
  const selectVideo = (video)=>{
    setSelectedVideo(video);
  }
  
  const search = ()=>{ //입력된 query를 가지고 search list get요청하는 함수
    youtube
      .search(searchInput)
      .then(videos=>setVideos(videos));
    setSearchInput("");
    setSelectedVideo(null);
    
  };

  return (
    <React.Fragment>
     <div className={styles.app}>
        <SearchAppBar 
          searchInput={searchInput} 
          setSearchInput={setSearchInput}
          onSearch={search}
        />
        <section className={styles.content}>
          {selectedVideo && 
            (<div className={styles.detail}>           
              <VideoDetail video={selectedVideo} />
            </div>)
          }
          <div className={styles.list}>
            <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? "list" : "grid"}/>
          </div>
        </section>
     </div>
    </React.Fragment>
  );
}

export default App;
