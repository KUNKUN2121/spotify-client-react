import React from 'react'
import Button from '@mui/material/Button';
// アイコンインポート
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SearchIcon from '@mui/icons-material/Search';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import QueueIcon from '@mui/icons-material/Queue';
import LyricsIcon from '@mui/icons-material/Lyrics';
import {Link} from 'react-router-dom';
import "./Controller.css";

const Controller = ({now, toggleQueueList , isLocked, release, request} ) => {
    // <button type="button" onClick={() => (isLocked ? release() : request())}>
    //     {isLocked ? "Release" : "Request"}
    // </button>
  return (
    <div className="controller">
            <button type="button" onClick={() => (isLocked ? release() : request())}>
        {isLocked ? 
        // WakeOnLock 有効
        <LightbulbIcon style={{fontSize: 32,}}/>
        : 
        <LightbulbIcon style={{fontSize: 32, opacity: 0.33 }}/>
        }
    </button>
        {/* <button onClick={toggleSleep}><LightbulbIcon style={{fontSize: 32}}/></button> */}
        <button onClick={toggleQueueList}><QueueMusicIcon style={{fontSize: 32}} /></button>
        <button><Link to='/history'><HistoryIcon style={{fontSize: 32}}/></Link></button>
        
    </div>
  )
}

export default Controller