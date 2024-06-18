import React from 'react'
import {Color, Palette} from "color-thief-react";
import GenBackImg from './GenBackImg';
// import '.back.jpeg';
const BackImg = ({setBackGroundColor, now}) => {
    // var img = "./back.jpg";
    var imgSrc = now['links']['album-art'];
    // var imgSrc = "https://i.scdn.co/image/ab67616d0000b273d660fd1d9051278e0e8ac09f";
    var result;
    return (
        <Palette src={imgSrc} crossOrigin="anonymous" format="hex" colorCount={4}>
        {({ data, loading }) => {
          if (loading) return null;
          result = data;
          setBackGroundColor(data);
        //   return <GenBackImg color={data} img={imgSrc}/>
    return null;
        //   return (
            // <div>
            //   Palette:
            //   <ul>
            //     {data.map((color, index) => (
            //       <li key={index} style={{ color: color }}>
            //         <strong>{color}</strong>
            //       </li>
            //     ))}
            //   </ul>
            // </div>
        //      null
        //   );
        }}
      </Palette>
      );
}

export default BackImg