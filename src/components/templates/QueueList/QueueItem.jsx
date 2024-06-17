import React from 'react'
import './QueueItem.css';
const QueueItem = ({queue}) => {
  return (
    <div className="queue-item">
        <img src={queue.album.images[2].url} alt="Album Art" className="album-art"/>
        <div className="info">
            <p className="title">{queue.name}</p>
            <div className="artists">
                    {queue.artists.map((artist) => {
                    return <p className="artist">{artist.name}</p>;
                    })}
            </div>
        </div>

    </div>
  )
}

export default QueueItem