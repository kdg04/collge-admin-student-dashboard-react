import { createContext, useState } from 'react';
import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar';

export const LoggedInContext = createContext();      // create a logged in context to maintain login status across comonents globally
export const UserIDContext = createContext();
export const ProfileClickedContext = createContext();
export const ReadFilesClickedContext = createContext();
export const FileIDClickedContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState(-1);
  const [profileClicked, setProfileClicked] = useState(false);
  const [readFilesClicked, setReadFilesClicked] = useState(false);
  const [fileId, setFileId] = useState('');

  return (
    <div className="App">
      <div className="AppGlass">
        <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>  
            <UserIDContext.Provider value={{ userID, setUserID }}>
              <ProfileClickedContext.Provider value={{ profileClicked, setProfileClicked}}>
                 <ReadFilesClickedContext.Provider value={{ readFilesClicked, setReadFilesClicked}}>   
                    <FileIDClickedContext.Provider value={{ fileId, setFileId}}>
                      <Sidebar/> 
                      <MainDash/>
                      <RightSide/> 
                    </FileIDClickedContext.Provider>
                 </ReadFilesClickedContext.Provider>
              </ProfileClickedContext.Provider>   
            </UserIDContext.Provider >
        </LoggedInContext.Provider>
      </div>
    </div>
  );
}

export default App;