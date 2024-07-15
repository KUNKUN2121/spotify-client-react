import React, { useState, useEffect } from 'react';
import './AddMusic.css';
import AddMusicItem from './AddMusicItem';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';

const AddMusic = ({ roomId, url }) => {
  const [searchName, setSearchName] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarPosition, setSnackbarPosition] = useState({ bottom: '10px' });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // setLoading(true);
    const timer = setTimeout(() => {
      if (searchName) {
        getSearchResult({
          roomId: roomId,
          q: searchName,
          setSearchResultList: setSearchResultList,
          url: url,
          setLoading: setLoading
        });
        setSearchResultList([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchName, roomId, url]);

  const inputChanged = (e) => {
    if(e.target.value !== "") setLoading(true);
    setSearchName(e.target.value);
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
    setSearchName("");
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  // snackBar 動くようにする

    // 変動する
    const button = document.getElementById("snackBarId");
    // 入力するところ
    const input = document.getElementById("input");
    
    //高さ計算
    let height = window.visualViewport.height;
    const viewport = window.visualViewport;

    const resizeHandler = () => {
        if (!/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
          height = viewport.height;
        }
        console.log('hello');
        const newBottom = `${height - viewport.height + 10}px`;
        setSnackbarPosition({ bottom: newBottom });
      };
      
      useEffect(() => {
        window.visualViewport.addEventListener("resize", resizeHandler);
        return () => window.visualViewport.removeEventListener("resize", resizeHandler);
      }, []);
      

  //

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
                id="input"
            />
            {searchResultList.map((item) => (
                <AddMusicItem key={item.id} item={item} roomId={roomId} url={url} addMusicFun={addMusicFun} />
            ))}
            {loading ? <div className="load" style={{
                    textAlign: "center",
                    padding: "16px"
                }}>
                <CircularProgress size="3rem"/>
            </div> : ""}
            
        </ul>
      </div>
      <div className="snackBarId" id="snackBarId">
        <Snackbar 
            open={snackbarOpen} 
            autoHideDuration={6000} 
            onClose={handleSnackbarClose}
            style={{position: 'fixed', ...snackbarPosition }}
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

    </div>
  );
};

const getSearchResult = async ({ roomId, q, setSearchResultList, url, setLoading}) => {
  const getUrl = `${url}/api/search/`;
  const params = { room_id: roomId, q: q };
  const query = new URLSearchParams(params);
  console.log(`${getUrl}?${query}`);
  return await fetch(`${getUrl}?${query}`)
    .then((res) => res.json())
    .then((data) => {
      setLoading(false);
      if (data.result) {
        setSearchResultList(data.result.tracks.items);
        console.log(data.result.tracks.items);
      } else {
        console.log("検索結果がありません");
      }

    });
};

export default AddMusic;
