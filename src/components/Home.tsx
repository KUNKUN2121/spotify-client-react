import React, { useEffect, useState } from 'react'
import "normalize.css"
import "./Home.css"
import "./templates/TopInfo/TopInfo"
import TopInfo from './templates/TopInfo/TopInfo';
import Lyrics from './templates/Lyrics/Lyrics';

const Home = () => {
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
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    return (
        <>
        <div className="progress">
            <div className="bar"></div>
            <div className="time">
                <p className="progress">00:00</p>
                <p className="duration">00:00</p>
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