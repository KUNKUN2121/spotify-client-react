// AddMusicItem.js

import React, { useRef, useState } from 'react';
import './AddMusic.css';

const AddMusicItem = ({ item, addMusicFun, roomId, url}) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [isCheckmarkVisible, setIsCheckmarkVisible] = useState(false);
  const startX = useRef(null);
  const startY = useRef(null);
  const isSwiping = useRef(false);
  

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isSwiping.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = startX.current - currentX;
    const diffY = startY.current - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
      e.stopPropagation();

      if (diffX > 50) {
        setIsSwiped(true);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.changedTouches[0].clientX;
    const diffX = startX.current - currentX;

    if (diffX > 50) {
        addMusicFun(item,roomId,url);
    }

    setIsSwiped(false);
    setIsCheckmarkVisible(false);
    isSwiping.current = false;
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isSwiping.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.clientX;
    const diffX = startX.current - currentX;

    if (diffX > 50) {
      setIsSwiped(true);
      setIsCheckmarkVisible(true);
    }
  };

  const handleMouseUp = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.clientX;
    const diffX = startX.current - currentX;

    if (diffX > 50) {
      addMusicFun(item,roomId,url);
    }

    setIsSwiped(false);
    setIsCheckmarkVisible(false);
    isSwiping.current = false;
  };

  const handleMouseLeave = () => {
    if (isSwiping.current) {
      setIsSwiped(false);
      setIsCheckmarkVisible(false);
      isSwiping.current = false;
    }
  };

  return (
    <li
      className={`item ${isSwiped ? 'swiped' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ touchAction: 'pan-y' }}
    >
      <img src={item.album.images[1].url} alt="" />
      <div className="title-artists">
        <p className="title">{item.name}</p>
        <div className="artists">
          {item.artists.map((artist) => (
            <p key={artist.id} className="artist">{artist.name}</p>
          ))}
        </div>
      </div>
    </li>
  );
};

export default AddMusicItem;
