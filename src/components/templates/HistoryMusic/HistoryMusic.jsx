import React, { useEffect, useState } from 'react'
import './HistoryMusic.css';
import {Link} from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import HistoryItem from './HistoryItem.jsx';
import { Button, CircularProgress } from '@mui/material';
const HistoryMusic = ({now, url, roomId}) => {

    const [history, setHistory] = useState();

    const fetchData = async () => {
        console.log("fetching_history");
        const response = await fetch(url + "/api/history?room_id=" + roomId);
        const data = await response.json();
        setHistory(data);
    }

    useEffect(() => {
      fetchData();
    }, []);
    
    
  return (
    <div className="history-music">
        {/* <Link to='/'><ClearIcon style={{fontSize: 32, textAlign: "right"}}/></Link> */}
        <div className="history-controller">
             <p>再生履歴 (新しい順)</p>
            <button ><Link to='/'><ClearIcon style={{fontSize: 32}}/></Link></button>
        </div>
        <div className="history-music-items">
           
            {history ? 
                history.items.map((item, i) => {
                    return <HistoryItem item={item} />
                }) 
            :  
                <div className="load">
                    <CircularProgress size="3rem"/>
                </div>
                // <Skeleton variant="rectangular" width="100%" height={60} className="album-art-skeleton" />
            }
        </div>
    </div>
  )
}

export default HistoryMusic