import React from 'react'
import './HistoryItem.css';
const HistoryItem = ({item}) => {
    const formatDate = (isoDateString) => {
    // ISO 8601形式の日付をJavaScriptのDateオブジェクトに変換
    const date = new Date(isoDateString);

    // 日本時間に変換（UTC +9時間）
    const jstDate = new Date(date.getTime());

    // 日付と時刻のフォーマットを作成
    const formattedDate = `${String(jstDate.getMonth() + 1).padStart(2, '0')}/${String(jstDate.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(jstDate.getHours()).padStart(2, '0')}:${String(jstDate.getMinutes()).padStart(2, '0')}`;

    // 現在時刻と比較して経過時間を計算
    const now = new Date();
    const elapsedMilliseconds = now - date;
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const remainingMinutes = elapsedMinutes % 60;

    let elapsedTimeString;
    if (elapsedMinutes < 60) {
        elapsedTimeString = `${elapsedMinutes}分前`;
    } else if (elapsedMinutes < 1440) { // 24 * 60 = 1440 分
        elapsedTimeString = `${elapsedHours}時間${remainingMinutes}分前`;
    } else {
        elapsedTimeString = '';
    }

    return `${formattedDate} ${formattedTime} (${elapsedTimeString})`;
    };

  return (
    <div className="history-item">
        <p>{formatDate(item.played_at)}</p>
            <div className="contents">
                <img src={item.track.album.images[2].url} alt="Album Art" className="album-art"/>
                <div className="info">
                    <p className="title">{item.track.name}</p>
                    <div className="artists">
                            {item.track.artists.map((artist) => {
                            return <p className="artist">{artist.name}</p>;
                            })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HistoryItem