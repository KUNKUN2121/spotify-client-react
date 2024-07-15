import "normalize.css"
import "./ProgressBar.css"
import { Button } from "@mui/material";
import { useState } from "react";

const ProgressBar = ({now, url, roomId, fetchData}) => {
    const [clickCount, setClickCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const convertTimeView = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handleClickNext = async () => {
        const now = Date.now();
        if (now - lastClickTime > 1000) {
            setClickCount(1);
        } else {
            setClickCount(clickCount + 1);
        }
        setLastClickTime(now);

        if (clickCount + 1 === 3) {
            // 3回クリックされた時の動作
            setClickCount(0);
            await fetchSkip('next');
            fetchData();
        }
    };
    const handleClickPrevious = async () => {
        const now = Date.now();
        if (now - lastClickTime > 1000) {
            setClickCount(1);
        } else {
            setClickCount(clickCount + 1);
        }
        setLastClickTime(now);

        if (clickCount + 1 === 3) {
            // 3回クリックされた時の動作
            setClickCount(0);
            await fetchSkip('previous');
            fetchData();
        }
    };

    const fetchSkip = async (value) => {
        console.log("fetching_history");
        const response = await fetch(url + "/api/" + value + "?room_id=" + roomId);
        return true;
    }



    return (
        <>
        <div className="progressduration">
            <div className="bar" style={{
                backgroundSize: `${(now ? (now.progress_ms / now.duration_ms) * 100 : 0)}%`,
            }}></div>
            <div className="times">
                <button className="time" onClick={handleClickPrevious}>
                    <p className="progress">{convertTimeView(now ? now.progress_ms : "")}</p>
                </button>
                <button className="time" onClick={handleClickNext}>
                    <p className="duration">{convertTimeView(now ? now.duration_ms : "")}</p>
                </button>
            </div>
        </div>
        </>
    );
}

export default ProgressBar