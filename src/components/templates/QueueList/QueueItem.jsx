import React from 'react'
import './QueueItem.css';
const QueueItem = ({queue}) => {
  return (
    <div className="queue-item">
        <p className="title">{queue.name}</p>
        <div className="artists">
                {queue.artists.map((artist) => {
                return <p className="artist">{artist.name}</p>;
                })}
            </div>
    </div>
  )
}

export default QueueItem