import React, { useEffect, useRef, useState } from 'react'
import './AddMusic.css'
import AddMusicItem from './AddMusicItem'
const AddMusic = ({roomId}) => {
    const [searchName, setSearchName] = useState("");
    const [timer, setTimer] = useState(null);
    const [serachResultList, setSerachResultList] = useState([]);

    const inputChanged = e => {
        setSearchName(e.target.value);
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            // fakeApi()
            getSeachResult({
                roomId: roomId,
                q: searchName,
                setSerachResultList: setSerachResultList,
            })
        }, 500)
        setTimer(newTimer)
    }
  return (
    <div className="add-music">
        <input type="checkbox" id="drawer" />
        <label for="drawer" class="open"><span></span></label>
        <label for="drawer" class="close"></label>
        <div className='menu'>
        <h2>曲の追加</h2>
        <ul>
        <input
            type="text"
            placeholder="キーワードを入力"
            onChange={inputChanged}
       />
            {serachResultList.map((item) => {
                return  <li key={item.id} className="item">
                            <img src={item.album.images[1].url} alt="" srcset="" />
                            <div className="title-artists">
                                <p className="title">{item.name}</p>
                                <div className="artists">
                                    {item.artists.map((artist) => {
                                        return <p className="artist">{artist.name}</p>
                                    })}
                                </div>
                            </div>
                            
                            {/* <p>{item.album.name}</p> */}
                        </li>
            })}
        </ul>
        </div>

    </div>
  )
}



export const getSeachResult = ({roomId, q, setSerachResultList}) => {
    // if(!serachWord) return;
    var url = "http://100.73.31.2/api/search";
    const params = { 
        room_id: roomId,
        q: q,
      };
const query = new URLSearchParams(params);
console.log(`${url}?${query}`);
    return new Promise((resolve,reject) => {
        fetch(`${url}?${query}`)
        .then((res) => res.json())
        .then((data) => {
            resolve(data);
            if(data.result){
                setSerachResultList(data.result.tracks.items);
                console.log(data.result.tracks.items)
            }else{
                console.log("noooooooo")
            }

        });
    });
}



export default AddMusic