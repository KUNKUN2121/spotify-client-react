import React, { useState } from 'react';
import './AddMusic.css';
import AddMusicItem from './AddMusicItem';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddMusic = ({ roomId, url }) => {
  const [searchName, setSearchName] = useState("");
  const [timer, setTimer] = useState(null);
  const [serachResultList, setSerachResultList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
        setSnackbarMessage("追加中・・・");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
    const csrf = await fetch(`${url}/api/csrf-token`, {
      credentials: 'include', // セッション情報を含める
    })
      .then(response => response.json())
      .then(data => {
        return data.token;
      });
    console.log("CSRF Token:", csrf);
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
        setSnackbarMessage("追加されました！");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("追加中にエラーが発生しました:", error);
        setSnackbarMessage("音楽の追加に失敗しました");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const toggleDrawer = () => {
    if (isDrawerOpen !== true) {
      getSeachResult({
        roomId: roomId,
        q: "",
        setSerachResultList: setSerachResultList,
        url: url,
      });
      console.log("hello")
    } else {
      setSearchName("");
      // iPhoneだとたまに動かなくなる。
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="add-music">
      <input type="checkbox" id="addDrawer" onChange={toggleDrawer} />
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
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
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
        console.log("検索結果がありません");
      }
    });
};

export default AddMusic;
