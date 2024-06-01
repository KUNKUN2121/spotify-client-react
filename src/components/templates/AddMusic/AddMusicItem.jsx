import React from 'react'

const AddMusicItem = (item) => {
    return (
        <div className="queue-item">
            <p className="title">{item.name}</p>
            <div className="artists">
                    {item.artists.map((artist) => {
                    return <p className="artist">{artist.name}</p>;
                    })}
                </div>
        </div>
      )
}

export default AddMusicItem