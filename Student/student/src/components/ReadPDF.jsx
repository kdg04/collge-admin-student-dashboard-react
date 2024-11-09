import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useContext, useState } from 'react';
import { ReadFilesClickedContext } from '../App';

const ReadPDF = ({ fileId }) => {
    const { readFilesClicked } = useContext(ReadFilesClickedContext);

    const handleClick = (event) => {
      event.preventDefault(); 
    };

    console.log("file id as seen in ReadPDF " + fileId);
    return (
        <div style={{position: 'relative', zIndex:5}} onClick={handleClick}>
          <embed src={readFilesClicked ? `http://localhost:8187/College/readPDF?fileId=${fileId}` : ''} 
                 type="application/pdf" 
                 width="100%" 
                 height="600px" 
                 style={{pointerEvents:'auto', zIndex:5}}/>
        </div>
      );

}

export default ReadPDF;