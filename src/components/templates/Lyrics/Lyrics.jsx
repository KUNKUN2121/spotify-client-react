import React, { useEffect, useRef, useState , CSSProperties} from 'react'
import './Lyrics.css'
import { Lrc, useRecoverAutoScrollImmediately  } from 'react-lrc';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
// import Lrc from 'react-lrc'; 
const Lyrics = ({now}) => {
    const prevTitleRef = useRef(now.title);
    const scrollRef = useRef(null);


    const { signal, recoverAutoScrollImmediately } =
    useRecoverAutoScrollImmediately();
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);

    // ボタンのクリックハンドラ
    const handleRecoverAutoScrollClick = () => {
      recoverAutoScrollImmediately();
    };

    

    const lineRenderer = ({ index, active, line}) => {
        return (
            <p
                key={index}
                style={{
                    color: active ? 'white' : '#686D76',
                    transition: 'color 0.3s ease',
                    fontSize: '30px',
                    textAlign: 'center',
                }}
            >
                {line.content}
            </p>
        );
    };
    const lineRendererNoSync = ({ index, active, line}) => {
        return (
            <p
                key={index}
                style={{
                    color: 'white',
                    opacity: '0.9',
                    transition: 'color 0.3s ease',
                    fontSize: '30px',
                    textAlign: 'center',
                }}
            >
                {line.content}
            </p>
        );
    };
    const autoScrollChangeFunction = (event) => {
        if (event.autoScroll !== undefined) {
            if(event.autoScroll != autoScrollEnabled){
                setAutoScrollEnabled(event.autoScroll);
                console.log("実行しました。")
            }
            
        }
    };
    const lrcStyle = {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto'  // 縦方向のスクロールを有効にする
    };

    return (
        <div className="lyrics-area">
            {/* <button type="button" onClick={recoverAutoScrollImmediately}> */}
                {/* recover auto scroll immediately
            </button> */}
            {!autoScrollEnabled && now.lyrics.response == 200 && (
                <button type="button" className="enable-auto-lyrics-btn"onClick={handleRecoverAutoScrollClick}>
                    <KeyboardReturnIcon />
                </button>
                
            )}
            {now.lyrics.response == 200 ? 
                <Lrc 
                     topBlank
                    //  verticalSpace={true}
                     className="lrc"
                     lrc={now.lyrics.syncedLyrics}
                     currentMillisecond={now.progress_ms}
                     lineRenderer={lineRenderer}
                     recoverAutoScrollInterval={50000}
                     recoverAutoScrollSingal={signal}
                     onAutoScrollChange={autoScrollChangeFunction}
                     style={lrcStyle}
                 />
            : now.lyrics.response == 201 ?  
                <Lrc 
                    topBlank
                    // verticalSpace={true}
                    className="lrc"
                    lrc={now.lyrics.syncedLyrics}
                    currentMillisecond="-1"
                    lineRenderer={lineRendererNoSync}
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