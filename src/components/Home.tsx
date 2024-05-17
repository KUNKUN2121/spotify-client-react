import React, { useEffect, useState } from 'react'
import "normalize.css"
import "./Home.css"
import "./templates/TopInfo/TopInfo"
import TopInfo from './templates/TopInfo/TopInfo';
import Lyrics from './templates/Lyrics/Lyrics';

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
    useEffect(() => {
        async function fetchData() {
          const response = await fetch('http://100.73.31.2/api/now?room_id=xRouwJ6jx51gv0WPNdWv1kpcaFO5La4d');
          const data = await response.json();
          
          setNow(data);
        //   console.log(data['progress_ms']);
        }
    
        const interval = setInterval(() => {
          fetchData();
        }, 2000);
    
        return () => clearInterval(interval);
      }, []);
    return (
        <>
        <div className="progress">
            <div className="bar"></div>
            <div className="time">
                <p className="progress">{convertTimeView(now ? now.progress_ms : "")}</p>
                <p className="duration">{convertTimeView(now ? now.duration_ms : "")}</p>
            </div>
        </div>
        {now ? <TopInfo now={now}/> : ""} 
        {now ? <Lyrics now={now}/> : ""} 
        {/* <TopInfo now={now}/> */}
        <div className="main-contents"></div>
        </>
    );
}

export default Home