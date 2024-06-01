import React from 'react';
import "./TopInfo.css";
import { Skeleton } from '@mui/material';

const TopInfo = ({ now }) => {
  const data = now || {
    title: "",
    artists: [{ name: "" }],
    links: { "album-art": "" },
  };

  return (
    <div className="top-info">
      {
        now ? (
          <img className="album-art" src={data.links["album-art"]} alt="Album Art" />
        ) : (
          <Skeleton variant="rectangular" width={60} height={60} className="album-art-skeleton" />
        )
      }
      <div className="info">
        <div className="title">
          {now ? data.title : <Skeleton width={100} />}
        </div>
        <div className="artists">
          {now ? (
            data.artists.map((artist, index) => (
              <p key={index} className="artist">{artist.name}</p>
            ))
          ) : (
            <Skeleton width={80} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TopInfo;
