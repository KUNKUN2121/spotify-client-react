import React from 'react'
import Button from '@mui/material/Button';
// アイコンインポート
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import QueueIcon from '@mui/icons-material/Queue';
import LyricsIcon from '@mui/icons-material/Lyrics';

const Controller = ({now}) => {
  return (
    <div>
        <HistoryIcon />
        <SettingsIcon />
        <QueueIcon />
        <QueueMusicIcon />
        <LyricsIcon />
    </div>
  )
}

export default Controller