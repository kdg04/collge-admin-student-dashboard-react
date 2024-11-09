import React, { useState, useEffect, useRef, useContext } from 'react';
import { LoggedInContext } from '../App';


const RtmnuScreenSaver = () => {
  const [showScreen, setShowScreen] = useState(true);
  const intervalRef = useRef(null);
  const { loggedIn } = useContext(LoggedInContext); 

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShowScreen(prevShow => !prevShow);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setShowScreen(false);
      clearInterval(intervalRef.current);
    }
  }, [loggedIn]);

  return (
    <>
      {showScreen && (
        <div className="sliding-screen">
          <h2>RTMNU Circulars 2024</h2>
        </div>
      )}
      {/* Additional UI elements */}
    </>
  );
};

export default RtmnuScreenSaver;
