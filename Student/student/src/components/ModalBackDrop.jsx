import React from 'react';
import { Backdrop } from '@mui/material';

const ModalBackdrop = ({ open }) => {
  return (
    <Backdrop sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                                             width: 'calc(100vw + 0px)', 
                                             height: 'calc(100vh + 0px)',
                                             position:'absolute',
                                             top:0,
                                             left:0,                                            
                                             } 
                 }} open={open}>
     
    </Backdrop>
  );
};

export default ModalBackdrop;

