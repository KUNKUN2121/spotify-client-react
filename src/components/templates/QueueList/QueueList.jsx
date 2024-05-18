import React, { useEffect } from 'react'
import QueueItem from './QueueItem'
import './QueueList.css';
const QueueList = ({now}) => {
  return (
    <div className='queue-list'>
        {now.queue.map((queue) => {
                // return <p className="artist">{queue}</p>;
                return <QueueItem queue={queue} />;
        })}
        {/* <QueueItem />
        <QueueItem /> */}
    </div>
    
    
  )
}

export default QueueList