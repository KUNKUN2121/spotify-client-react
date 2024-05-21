import React, { useEffect, useState } from 'react'
import "normalize.css"
import "./Home.css"
import "./templates/TopInfo/TopInfo"
import TopInfo from './templates/TopInfo/TopInfo';
import Lyrics from './templates/Lyrics/Lyrics';
import Controller from './templates/Controller/Controller';
import QueueList from './templates/QueueList/QueueList';

const Home = ({now}) => {
    const convertTimeView = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <>
        <div className="progressduration">
            <div className="bar" style={{
                backgroundSize: `${(now ? (now.progress_ms / now.duration_ms) * 100 : 0)}%`,
            }}></div>
            <div className="time">
                <p className="progress">{convertTimeView(now ? now.progress_ms : "")}</p>
                <p className="duration">{convertTimeView(now ? now.duration_ms : "")}</p>
            </div>
        </div>
        {now ? <TopInfo now={now}/> : ""} 

        
        <div className="main-contents"></div>
        </>
    );
}

export default Home