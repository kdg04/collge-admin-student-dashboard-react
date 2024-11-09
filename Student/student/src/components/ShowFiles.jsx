import React, { useState, useEffect, useContext } from 'react';
import { UserIDContext } from '../App';
import './ShowFiles.css';

const ShowFiles = ( {fileId, setFileId} ) => {
  console.log("ShowFiles rendered"); 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [fileNames, setFileNames] = useState([]);
    const { userID } = useContext(UserIDContext);

    const getFiles = async () => {
        try {
          const response = await fetch(`http://localhost:8187/College/getFileList?userId=${userID}`); 
          console.log("reached in getFiles");
          const data = await response.json();
          setFileNames(data); 
          console.log("fileNames  : " + data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
 
      useEffect( ()=> {
        getFiles();
        console.log("fileNames  : " + fileNames);
      }, []);
 
    const handleFileClick = (Id) => {
      setFileId(Id);
      console.log("fileId : " + fileId);
      setDropdownOpen(false);            // Close the dropdown after a file is clicked
    };

    return (
        <div className="pdfFiles">
          <div className="dropdown">
            <div className="dropdown-content">
                {fileNames.map( file => (
                    <a href="#" key={file._id} onClick={() => handleFileClick(file._id)} style={{display:'block'}}>             
                       {file.name}
                    </a>         
                ))}
            </div>
          </div>
        </div>
      );

};

export default ShowFiles;