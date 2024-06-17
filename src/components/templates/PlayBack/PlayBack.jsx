import { React, Button ,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
const PlayBack = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        if(isDrawerOpen != true){

        }
        setIsDrawerOpen(!isDrawerOpen);
      };

  return (
    <div className="history">
        <label htmlFor="drawer" className="open"><HistoryIcon /></label>
    </div>
  )
}

export default PlayBack