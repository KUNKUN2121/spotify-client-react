import React from 'react'
import "./TopInfo.css"
const TopInfo = ({now}) => {
    let data;
    if(now != null){
        data = now;
    }else{
        data = { 
            title: "" ,
            artists: {
                name: ""
            }
        };
    }

  return (
    <>
    <div className="top-info">
        <img className="album-art" src={data.links["album-art"]} alt="" srcset="" />
        <div className="info">
            <div className="title">{data.title}</div>
            <div className="artists">
                {data.artists.map((artist) => {
                return <p className="artist">{artist.name}</p>;
                })}
            </div>
        </div>

        
    </div>
    </>
  )
}

export default TopInfo