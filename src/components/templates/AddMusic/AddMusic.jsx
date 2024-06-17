import React, { useEffect, useState } from 'react';
import './AddMusic.css';
import AddMusicItem from './AddMusicItem';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const AddMusic = ({ roomId, url }) => {
  const [searchName, setSearchName] = useState("");
  const [timer, setTimer] = useState(null);
  const [serachResultList, setSerachResultList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const inputChanged = (e) => {
    setSearchName(e.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      getSeachResult({
        roomId: roomId,
        q: searchName,
        setSerachResultList: setSerachResultList,
        url: url,
      });
    }, 800);
    setTimer(newTimer);
  };

  const addMusicFun = async (item, roomId, url) => {
    const csrf = await fetch(`${url}/api/csrf-token`, {
      credentials: 'include', // セッション情報を含める
    })
      .then(response => response.json())
      .then(data => {
        return data.token;
      });
      console.log("CSRF Token:",csrf);
    console.log("Adding music:", item);
    const posturl = `${url}/api/add`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      credentials: 'include', // セッション情報を含める
      body: JSON.stringify({
        room_id: roomId,
        uri: item.uri,
      })
    };

    console.log(posturl);
    var response = await fetch(posturl, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error adding music:", error);
      });
  };
  const toggleDrawer = () => {
    if(isDrawerOpen != true){
        getSeachResult({
            roomId: roomId,
            q: "",
            setSerachResultList: setSerachResultList,
            url: url,
          });
          console.log("hello")
    }else{
        setSearchName("");
        // iphoneだとたまに動かなくなる。
    }
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="add-music">
      <input type="checkbox" id="addDrawer" onChange={toggleDrawer}/>
      <label htmlFor="addDrawer" className="open"><SearchIcon /></label>
      <label htmlFor="addDrawer" className="close"></label>
      <div className="menu">
        <h2>曲の追加</h2>
        <ul>
          <input
            type="text"
            placeholder="キーワードを入力"
            onChange={inputChanged}
            value={searchName}
          />
          {serachResultList.map((item) => (
            <AddMusicItem key={item.id} item={item} roomId={roomId} url={url} addMusicFun={addMusicFun} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const getSeachResult = async ({ roomId, q, setSerachResultList, url }) => {
  const getUrl = `${url}/api/search/`;
  const params = { room_id: roomId, q: q };
  const query = new URLSearchParams(params);
  console.log(`${getUrl}?${query}`);
  return await fetch(`${getUrl}?${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.result) {
        setSerachResultList(data.result.tracks.items);
        console.log(data.result.tracks.items);
      } else {
        console.log("no results");
      }
    });
};

export default AddMusic;
