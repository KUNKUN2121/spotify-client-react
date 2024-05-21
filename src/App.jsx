
import './App.css';
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import "normalize.css"

import Home from './components/templates/ProgressBar/ProgressBar.jsx'
import AddMusic from './components/templates/AddMusic/AddMusic.jsx'
import Lyrics from './components/templates/Lyrics/Lyrics.jsx'
import TopInfo from './components/templates/TopInfo/TopInfo.jsx'
import QueueList from './components/templates/QueueList/QueueList.jsx'
import Controller from './components/templates/Controller/Controller.jsx'
import { useEffect, useState } from 'react';

function App() {
    const [now, setNow] = useState();
    // SpotifyAPIとの遅延時間を計算する関数
    const getDelay = (data) =>{
        const getSpotifyTime = new Date(data.get_spotify_timestamp);
        const currentDate = new Date();
        return currentDate.getTime() - getSpotifyTime.getTime();
    }

    // API取得
    const roomId="xRouwJ6jx51gv0WPNdWv1kpcaFO5La4d";
    const fetchData = async () => {
        console.log("fetching");
        const response = await fetch("http://100.73.31.2/api/now?room_id=" + roomId);
        const data = await response.json();
        data.progress_ms += getDelay(data);
        setNow(data);
    }
    useEffect(() => {
        fetchData(); // 読み込み時に実行
        const interval = setInterval(() => {
            fetchData();
        }, 2000);
        return () => clearInterval(interval);
        }, []);
        
        useEffect(() => {
            function addProgress() {
                if(now != null){
                    if(now.is_playing == true){
                        if(now.progress_ms <now.duration_ms) {
                            setNow(prevNow => ({ ...prevNow, progress_ms: prevNow.progress_ms + 200 }));
                            // setProgressBarPercent(now.progress_ms / now.duration_ms * 100);
                        }else{
                            fetchData();
                        }
                    }
                }else{
                    
                }
            }
        
            const interval = setInterval(() => {
              addProgress();
            }, 200);
        
            return () => clearInterval(interval);
          }, [now]);

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>
                {/* {progressBAR} */}
                {now ? <Home now={now}/>: ""}
                {now ? <TopInfo now={now}/> : ""} 
                {now ? <Lyrics now={now}/> : ""}
                {now ? <Controller now={now}/> : ""}  
                {now ? <QueueList  now={now}/> : ""}
            </>} />
            

        </Routes>
    </BrowserRouter>
  );
}

export default App;
