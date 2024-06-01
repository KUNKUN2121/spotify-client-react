import React, { useState, useRef } from 'react';

function SwipeableTrack({ track, addToNextUp }) {
  const [isSwiped, setIsSwiped] = useState(false);
  const startX = useRef(null);
  const isSwiping = useRef(false);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.touches[0].clientX;
    const diffX = startX.current - currentX;

    if (diffX > 50) {
      setIsSwiped(true);
    }
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.changedTouches[0].clientX;
    const diffX = startX.current - currentX;

    if (diffX > 50) {
    //   addToNextUp(track);
    }

    setIsSwiped(false);
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
    }
  };

  const handleMouseUp = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.clientX;
    const diffX = startX.current - currentX;

    if (diffX > 50) {
    //   addToNextUp(track);
    }

    setIsSwiped(false);
    isSwiping.current = false;
  };

  const handleMouseLeave = () => {
    if (isSwiping.current) {
      setIsSwiped(false);
      isSwiping.current = false;
    }
  };

  return (
    <div
      className={`track ${isSwiped ? 'swiped' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {track}
    </div>
  );
}

export default SwipeableTrack;
