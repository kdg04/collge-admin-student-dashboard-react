import React, { useContext, useState, useRef, useEffect } from 'react';
import { TextField, Button, Typography, Avatar } from '@mui/material';
import FormData from 'form-data';
import { UserIDContext } from '../App';
import { LoggedInContext } from '../App';

const UserProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const fileInputRef = useRef(null);
    const { userID } = useContext(UserIDContext);
    const { loggedIn } = useContext(LoggedInContext);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setProfileImage(URL.createObjectURL(file));
        fileInputRef.current.value = ''; 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User profile updated:', { name, email, mobile, profileImage });
        uploadProfile(selectedFile);                      
    };
  
    useEffect(() => {       
        if(loggedIn)         
          fetchProfile();
        else {
            setName('');
            setEmail('');
            setMobile('');
            setAboutMe('');
            setProfileImage('');
        }
      }, [loggedIn]);

      useEffect(() => {                
        fetchProfile();
    }, [userID]); 

     

    const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:8187/College/fetchProfile?userId=${userID}`); 
          const data = await response.json();
          console.log("profile data mobile: " + data.mob);
          setName(data.name);
          setProfileImage(`http://localhost:8187/College/getProfileImage?userId=${userID}`);
          setEmail(data.email);
          setMobile(data.mob);
          setAboutMe(data.aboutMe);                 
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

    const uploadProfile = async (imgFile) => {
        const formData = new FormData();
        formData.append("profileImage", imgFile);
        formData.append("userId", userID);         
        formData.append("name", name);       
        formData.append("mobile", mobile);  
        formData.append("email", email);
        formData.append("aboutMe", aboutMe);
        try {
            const response = await fetch('http://localhost:8187/College/uploadProfile', {
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
            console.error('Error:', error); 
          }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <Typography variant="h5" gutterBottom>
                User Profile
            </Typography>
            <Avatar
                src={profileImage}
                alt="Profile Image"
                style={{ width: 100, height: 100, margin: 'auto' }}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ margin: '10px auto'}}
                ref={fileInputRef}
            />
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: 10 }}
                    disabled={true}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
                <TextField
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
                <TextField
                    label="About Me"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Save Profile
                </Button>
            </form>
            
        </div>
    );
};

export default UserProfile;
