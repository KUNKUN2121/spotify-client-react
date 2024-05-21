import React, { useEffect, useState } from 'react'
import "normalize.css"
import "./Home.css"
import "./templates/TopInfo/TopInfo"
import TopInfo from './templates/TopInfo/TopInfo';
import Lyrics from './templates/Lyrics/Lyrics';
import Controller from './templates/Controller/Controller';
import QueueList from './templates/QueueList/QueueList';

const Home = () => {
    const convertTimeView = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const [now, setNow] = useState();
    const [progress, setProgress] = useState(0);
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    
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
                        setProgressBarPercent(now.progress_ms / now.duration_ms * 100);
                    }
                }
            }else{
                fetchData();
            }
        }
    
        const interval = setInterval(() => {
          addProgress();
        }, 200);
    
        return () => clearInterval(interval);
      }, [now]);

    return (
        <>
        <div className="progressduration">
            <div className="bar" style={{
                backgroundSize: progressBarPercent + "%",
            }}></div>
            <div className="time">
                <p className="progress">{convertTimeView(now ? now.progress_ms : "")}</p>
                <p className="duration">{convertTimeView(now ? now.duration_ms : "")}</p>
            </div>
        </div>
        {now ? <TopInfo now={now}/> : ""} 
        {now ? <Lyrics now={now}/> : ""} 
        {/* {now ? <Controller now={now}/> : ""}  */}
        {now ? <QueueList  now={now}/> : ""}
        <div className="main-contents"></div>
        </>
    );
}

export default Home