
import './App.css';
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import "normalize.css"

import ProgressBar from './components/templates/ProgressBar/ProgressBar.jsx'
import AddMusic from './components/templates/AddMusic/AddMusic.jsx'
import Lyrics from './components/templates/Lyrics/Lyrics.jsx'
import TopInfo from './components/templates/TopInfo/TopInfo.jsx'
import QueueList from './components/templates/QueueList/QueueList.jsx'
import HistoryMusic from './components/templates/HistoryMusic/HistoryMusic.jsx'
import Controller from './components/templates/Controller/Controller.jsx'
import { useEffect, useState } from 'react';
import {Color, Palette} from "color-thief-react";
import BackImg from './components/BackImg/BackImg.jsx';
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers.js';
import GenBackImg from './components/BackImg/GenBackImg.jsx';

function App() {
    var url = "http://100.73.31.2";
    var roomId = "xRouwJ6jx51gv0WPNdWv1kpcaFO5La4d";

    const [now, setNow] = useState();
    const [queueListOpen, setQueueListOpen] = useState(true);
    const [BackGroundColor, setBackGroundColor] = useState([]);
    
    // SpotifyAPIとの遅延時間を計算する関数
    const getDelay = (data) =>{
        const getSpotifyTime = new Date(data.get_spotify_timestamp);
        const currentDate = new Date();
        return currentDate.getTime() - getSpotifyTime.getTime();
    }

    // API取得
    const fetchData = async () => {
        console.log("fetching");
        const response = await fetch(url + "/api/now?room_id=" + roomId);
        const data = await response.json();
        if(data.progress_ms === "" || data.progress_ms === null || data.progress_ms === undefined){
            setNow(null);
            return;
        }
        data.progress_ms += getDelay(data);
        setNow(data);
    }
    useEffect(() => {
        fetchData(); // 読み込み時に実行
        
        const interval = setInterval(() => {
            fetchData();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
        
    useEffect(() => {
        function addProgress() {
            if(now != null){
                if(now.is_playing == true){
                    if(now.progress_ms < now.duration_ms) {
                        setNow(prevNow => ({ ...prevNow, progress_ms: prevNow.progress_ms + 200 }));
                    }else{
                        clearInterval(progressInterval); 
                        setTimeout(() => {
                            fetchData();
                        }, 300); // 300ms待って[からfetchDataを実行
                    }
                }
            }
        }
        const progressInterval = setInterval(() => {
            addProgress();
        }, 200);
    
        return () => clearInterval(progressInterval);
    }, [now]);

    const toggleQueueList = () => {
        setQueueListOpen(!queueListOpen);
    };


    useEffect(() => {
        console.log(BackGroundColor);
        // Background color setting for body
        const gradient = `linear-gradient(20deg, ${BackGroundColor.join(",")})`;
        document.body.style.background = gradient; // Assuming BackGroundColor is an array of colors and we set the first one
      }, [BackGroundColor])
    
            
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>
                <ProgressBar now={now}/>
                <TopInfo now={now}/>
                {now ? <Controller now={now} toggleQueueList={toggleQueueList}/> : ""}  
                {now ? <Lyrics now={now} queueListOpen={queueListOpen}/> : ""}
                {now ? 
                    queueListOpen ?
                     <QueueList  now={now}/> 
                     : ""
                : ""}
                {now ? <AddMusic  roomId={roomId} url={url}/> : ""}
                
            </>} />
            <Route path="/add" element={<>
                {now ? <ProgressBar now={now}/> : ""}
                <AddMusic />
            </>} />
            <Route path="/history" element={<>
                <ProgressBar now={now}/>
                <TopInfo now={now}/>
                {now ? <HistoryMusic now={now} roomId={roomId} url={url}/> : ""}
            </>} />
            <Route path="/back" element={<>
                {now ? <BackImg setBackGroundColor={setBackGroundColor} now={now}/>  : "" }
                {BackGroundColor ? <GenBackImg color={BackGroundColor} /> : ""}
            </>} />
            

        </Routes>
    </BrowserRouter>
  );
}

export default App;
