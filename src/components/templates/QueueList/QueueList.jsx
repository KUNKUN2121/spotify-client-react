import React, { useEffect } from 'react'
import QueueItem from './QueueItem'
import './QueueList.css';
const QueueList = ({now}) => {
  return (
    <div className='queue-list'>
        {now.queue.map((queue, i) => {
                // return <p className="artist">{queue}</p>;
                return <QueueItem queue={queue} key={i}/>;
        })}
        {/* <QueueItem />
        <QueueItem /> */}
    </div>
    
    
  )
}

export default QueueList