import React from 'react';
import { useEffect, useState } from 'react';

function WelcomeMessage(user) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect( () => {
        const timeoutId = setTimeout( () => setIsVisible(false), 4000);
        return () => clearTimeout(timeoutId);
    }, []);

    console.log("in WelcomeMessage user is : " + user);
    
    return (
        <div style={{ display: isVisible ? 'block' : 'none' }}>
            <h1>Hello {user} Welcome back</h1>
            
        </div>
    );
    
    }


export default WelcomeMessage;