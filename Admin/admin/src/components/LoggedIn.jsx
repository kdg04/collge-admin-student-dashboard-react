import React, { useState, useRef } from 'react';

const LoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const loggedInRef = useRef(loggedIn); // Create ref
  loggedInRef.current = loggedIn; // Update ref with current state



  return (
    <div style={{ display: 'none' }}>
      {/* Hide this component from rendering */}
      <input type="hidden" id="loggedIn" value={loggedIn} onChange={() => {}} />
    </div>
  );
};

export default LoggedIn;
