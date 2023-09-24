import React from 'react'
import { Avatar, Box, Button, Divider, IconButton, Modal, Typography } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useTheme } from '@emotion/react';
import FlexBetween from 'components/widget/FlexBetween';
import { IoMdCloudUpload } from 'react-icons/io';


const CompleProfile = ({ open, handleClose }) => {
    const theme = useTheme()
    const fontSm = theme.palette.neutral.fontSm
    const main = theme.palette.background.main
    const alt = theme.palette.background.alt
    const orange = theme.palette.neutral.orange
    const purple = theme.palette.neutral.purple
    const mediumpurple = theme.palette.neutral.mediumpurple

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '80%',
        bgcolor: main,
        boxShadow: 24,
        borderRadius: '10px'
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <FlexBetween sx={{ pl: 2, pr: 1, py: 1 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Complete Profile
                    </Typography>
                    <IconButton aria-label="decline" onClick={handleClose}>
                        <AiFillCloseCircle />
                    </IconButton>
                </FlexBetween>
                <Divider sx={{ color: fontSm }} />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
                    <Box sx={{ borderRadius: '10px 10px 0px 0px', height: '20%', bgcolor: alt, display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                        <Box sx={{ height: "5.5rem", width: '5.5rem', position: 'absolute', top: '7rem', left: '2rem', }}>
                            <Avatar sx={{ border: `3px solid ${alt}`, height: "100%", width: '100%' }} src='https://source.unsplash.com/featured/300x118' />
                            <Box sx={{
                                height: "1.6rem", width: '1.6rem', backgroundColor: main, position: 'relative', left: '4.5rem', bottom: '2rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: `1px solid ${orange}`
                            }}>
                                <IconButton ><IoMdCloudUpload size={'1rem'} /></IconButton>
                            </Box>
                        </Box>
                        <Button variant='contained' sx={{
                            display: 'flex', alignItems: 'center', gap: '0.3rem', textTransform: 'none', alignSelf: 'flex-end', p: '4px 8px', backgroundColor: purple,
                            color: main, ":hover": { backgroundColor: mediumpurple }
                        }}>
                            <IoMdCloudUpload size={'1.1rem'} />
                            Add Cover Photo
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CompleProfile