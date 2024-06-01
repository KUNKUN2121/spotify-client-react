import React, { useEffect, useRef, useState , CSSProperties} from 'react'
import './Lyrics.css'
import { Lrc, useRecoverAutoScrollImmediately  } from 'react-lrc';
// import Lrc from 'react-lrc'; 
const Lyrics = ({now}) => {
    const prevTitleRef = useRef(now.title);
    const scrollRef = useRef(null);

    // スクロールのリセット処理
    useRecoverAutoScrollImmediately({
        currentRef: scrollRef,
        isPlaying: true,
        time: now.progress_ms
    });

    const lineRenderer = ({ index, active, line}) => {
        return (
            <p
                key={index}
                style={{
                    color: active ? 'red' : 'black',
                    transition: 'color 0.3s ease',
                    fontSize: '32px',
                    textAlign: 'center',
                }}
            >
                {line.content}
            </p>
        );
    };

    const lrcStyle = {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto'  // 縦方向のスクロールを有効にする
    };

    return (
        <div className="lyrics-area" ref={scrollRef}>
            {now.lyrics.response == 200 ? 
                <Lrc 
                     topBlank
                     bottomBlank
                     className="lrc"
                     lrc={now.lyrics.syncedLyrics}
                     currentMillisecond={now.progress_ms}
                     lineRenderer={lineRenderer}
                     style={lrcStyle}
                 />
            : now.lyrics.response == 201 ?  
                <Lrc 
                    topBlank
                    bottomBlank
                    className="lrc"
                    lrc={now.lyrics.syncedLyrics}
                    currentMillisecond="-1"
                    lineRenderer={lineRenderer}
                    style={lrcStyle}
                />
            :                 
                <div className="no-lyrics">
                    <p>この曲には歌詞がありません。</p>
                </div>
            }

        </div>
    
    )
}

export default Lyrics