import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { LoggedInContext } from "../App";
import { UserIDContext } from "../App";
import { ProfileClickedContext } from "../App";
import { ReadFilesClickedContext } from "../App";
import { FileIDClickedContext } from "../App";
import ShowFiles  from './ShowFiles';
import UploadFile from "./UploadFile";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const [present, setPresent] = useState(-1);
  const [abscent, setAbscent] = useState(-1);
  const [attendnAlarm, setAttendnAlarm] = useState(false);
  const [attendnVisibility, setAttendnVisibility] = useState(true);
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { userID } = useContext(UserIDContext);
  const { profileClicked, setProfileClicked } = useContext(ProfileClickedContext);
  const { readFilesClicked, setReadFilesClicked } = useContext(ReadFilesClickedContext);
  const { fileId, setFileId } = useContext(FileIDClickedContext);
  const [uploadFileClicked, setUploadFileClicked] = useState(false);
  
  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  const getAttendance = async () => {
    try {
      const response = await fetch(`http://localhost:8187/College/getAttendance?userId=${userID}`); 
      const data = await response.json();
      setPresent(data.present);
      setAbscent(data.abscent);
      
      setAttendnVisibility(!attendnVisibility);
      if (present < ((present + abscent) * 0.75)) {
         setAttendnAlarm(true);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  const handleClick = (item) => {
    if(item === 1)
       setProfileClicked(!profileClicked);
    if(item === 3)
       setUploadFileClicked(!uploadFileClicked);
    if(item === 4) {
       console.log("reached in Sidebar");
       setReadFilesClicked(!readFilesClicked);
    }     
    if(item === 5)
       getAttendance();     
      }

  useEffect(() => {
    getAttendance();
  }, []);    

  useEffect(() => {
    setAttendnVisibility(false);
  }, [loggedIn]);

 
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              {!loggedIn ? (
                <>
                  <item.icon style={{opacity:0.5}} />  
                  <span style={{opacity:0.5}}>{item.heading}</span>
                </>
               ) : (
                <>              
                  <item.icon onClick={() => handleClick(index)} /> 
                  <span>{item.heading }</span>
                  
                  {item.heading === "Read-Files" && readFilesClicked && (
                  <div className="readFilesSection" style={{height:'100px'}}>
                    <ShowFiles fileId={fileId} setFileId={setFileId} />
                  </div>
                  )}
                  {item.heading === "Upload-File" && uploadFileClicked && (
                  <div className="uploadFileSection" style={{height:'30px'}}>
                    <UploadFile />
                  </div>
                  )}
                </>
              )}
              
            </div>
          );
        })}
        
        <div className='attendance' style={{marginTop: '-30px', marginLeft:'70px', display:attendnVisibility ?'block' : 'none'}}>
            <span style={{borderBottom:attendnAlarm ? 'solid 5px red' : 'solid 5px green'}}>{present}</span>-{abscent}
        </div>
        {/* signoutIcon */}
        <div className="menuItem">
          <UilSignOutAlt onClick= {() => setLoggedIn(false)} />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;