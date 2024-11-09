import React, { useContext, useState, useRef } from 'react';
import { UserIDContext } from '../App';

const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { userID } = useContext(UserIDContext);
    const fileInputRef = useRef(null);
 

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if(selectedFile) {
            console.log("user Id in Upload file : " + userID);
            const formData = new FormData();
            console.log("user Id in Upload file2 : " + userID);
            formData.append("userId", userID);
            formData.append("pdfFile", selectedFile);

            try {
                const response = await fetch('http://localhost:8187/College/uploadFile', {
                    method: "POST",
                    body: formData,
                });
                if (response.status === 200) {
                    const data = await response.text();
                    console.log(data);       
                    } else {
                        console.log("error response status not 200 " + response.statusText);
                    }   
    
            } catch (error) {  
                console.error('File upload error:', error); 
              }
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInputRef} 
        id="fileInput" 
      />
      <label htmlFor="fileInput" style={{marginLeft:'5px'}}>Choose File</label>
      <button onClick={handleUpload} style={{marginLeft:'10px', marginRight:'5px'}}>Upload</button>
    </div>
    );
};

export default UploadFile;