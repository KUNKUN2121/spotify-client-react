import React, { useEffect, useRef, useState } from 'react'
import './Lyrics.css'
const Lyrics = ({now}) => {
    // console.log(now.lyrics.syncedLyrics);
    // var lyricsData = parseLRC(now.lyrics.syncedLyrics);
    const [lyricsData, setLyricsData] = useState([]);
    // if(now.links.song-id);
    const [count, setCount] = useState(-1);
    const [lyrics, setLyrics] = useState();
    const lyricsAreaRef = useRef(null);
    const prevTitleRef = useRef(now.title);



    // console.log(lyricsData)
    

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCount(prevCount => prevCount + 1);
    //         console.log(now['progress_ms'])
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);


    useEffect(() => {
        if (lyricsAreaRef.current) {
            const container = lyricsAreaRef.current;
            const targetElement = document.getElementById(count);
            if (container && targetElement) {
                const containerRect = container.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                const offset = targetRect.top - containerRect.top - (containerRect.height - targetRect.height) / 2;

                container.scrollTo({
                    top: container.scrollTop + offset,
                    behavior: 'smooth'
                });
            }
        }
    }, [count]);

    // 曲が変わったときの処理
    useEffect(() => {
        if(prevTitleRef.current !== now.title){
            prevTitleRef.current = now.title; // タイトルを変更
            setCount(0); // 歌詞の位置を0に
            const newLyricsData = parseLRC(now.lyrics.syncedLyrics); // 歌詞を変更
            setLyricsData(newLyricsData); 
        }
    }, [now.title]);

    useEffect(() => {
        console.log('aaa');
        const progressSec = now["progress_ms"] / 1000;
        if (lyricsData && lyricsData.length > 0) {
            console.log('bbb')
            const closestLine = lyricsData.reduce((prev, curr) => {
                const prevTime = prev.timestamp;
                const currTime = curr.timestamp;
                const progressTime = now['progress_ms'] / 1000;

                return Math.abs(currTime - progressTime) < Math.abs(prevTime - progressTime) ? curr : prev;
            }, { timestamp: '0', text: '', count: -1 });

            setCount(closestLine.count);
        }

    }, [now["progress_ms"]]);


    
    



  return (
    <div>Lyrics
        <div className="lyrics" ref={lyricsAreaRef}>
            {lyricsData != null ? (
                lyricsData.map(line => (
                    <p 
                        key={line.count} 
                        id={line.count}
                        style={{ color: line.count === count ? 'red' : 'black' }}>
                        {line.text}
                    </p>
                ))
            ) : (
                <p>aaaaa</p>
            )}
        </div>
    </div>
  )
}


const parseLRC = (data) => {
    let lines;
    try {
        lines = data.split('\n');
    } catch (error) {

    }
    const result = [];
    let count = 0;
    for (const line of lines) {
      const match = line.match(/\[(\d+:\d+\.\d+)\](.+)/);
      if (match) {
        const timestamp = convertTimestampToSeconds(match[1]);
        const text = match[2];
        result.push({ timestamp, text, count });
        count++;
      }
      else{
        // console.log(line);
        result.push({timestamp: null, text: line });
      }
    }

    return result;
}

const convertTimestampToSeconds = (timestamp) => {
    if (timestamp) {
        const [minutes, seconds] = timestamp.split(':').map(parseFloat);
        console.log('hello');
        return minutes * 60 + seconds;
    } else {
        return 0; // または、アプリケーションに適した形で null ケースを処理してください
    }
};

export default Lyrics