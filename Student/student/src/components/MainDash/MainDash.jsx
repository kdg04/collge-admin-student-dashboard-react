import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import User from "../User";
import { useContext, useState } from "react";
import { FileIDClickedContext, LoggedInContext, ReadFilesClickedContext } from "../../App";
import MessageSection from "../MessageSection";
import ModalTable from "../ModalTable";
import { ProfileClickedContext } from "../../App";
import Profile from '../Profile';
import ReadPDF from '../ReadPDF';

const MainDash = () => {
  const { loggedIn } = useContext(LoggedInContext);
  const [user, setUser] = useState('');
  const { profileClicked } = useContext(ProfileClickedContext);
  const { readFilesClicked } = useContext(ReadFilesClickedContext);
  const { fileId } = useContext(FileIDClickedContext);
 
  const SetUserInMain = (name) => {
    setUser(name); 
  };
  
  console.log(" file id in maindash " + fileId);
  return (
    <div className="MainDash" style={{ position: 'relative', display:'flex', allignItems: 'center'}}>
      <div style={{  position: 'absolute', top: 10, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', height: '80px', zIndex: 2 }}>
          <div style={{marginRight:'0', allignItems: 'top'}}>
            {loggedIn && user ? <h1>Welcome {user} </h1> : <h1>Hello Guest</h1>}
          </div> 
          <div style={{display:'flex', marginLeft: 'auto', allignItems:'top'}}>
            <MessageSection />
            <div style={{ marginRight:'2px'}}>
                <User updateUserInMain={SetUserInMain}/>             
            </div>              
          </div>         
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
          {profileClicked && <Profile />}     
          {readFilesClicked && fileId != '' && <ReadPDF fileId={fileId} /> }
          <Cards />
          <Table />    
      </div>
             
    </div>
  );
};

export default MainDash;