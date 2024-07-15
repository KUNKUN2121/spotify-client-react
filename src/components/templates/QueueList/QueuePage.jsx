import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QueueItem from './QueueItem';
import './QueuePage.css';
const QueuePage = ({url, roomId}) => {
    const [queueList, setQueueList] = useState();

    const fetchData = async () => {
        console.log("fetching_queue");
        const response = await fetch(url + "/api/queue?room_id=" + roomId);
        const data = await response.json();
        setQueueList(data);
    }

    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div className="queue-page">
        <div className="queue-page-controller">
            <p>次に再生</p>
            <button ><Link to='/'><ClearIcon style={{fontSize: 32}}/></Link></button>
        </div>
        <div className="queue-page-items">
        {queueList ? 
                    queueList.queue.map((queue, i) => {
                        return <QueueItem queue={queue} key={i}/>;
                    }) 
                :  
                    <div className="load">
                        <CircularProgress size="3rem"/>
                    </div>
                }
        </div>
    </div>
  )
}

export default QueuePage