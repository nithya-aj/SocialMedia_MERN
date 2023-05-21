import { useTheme } from '@emotion/react'
import React from 'react'
import FlexBetween from 'components/FlexBetween';
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import Avatar from '@mui/material/Avatar';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { IoNotificationsOutline } from "react-icons/io5";

const NavItems = () => {

    const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const theme = useTheme()
    const alt = theme.palette.background.alt
    const dark = theme.palette.primary.dark
    const text = theme.palette.neutral.dark

    return (
        <Box sx={{ pl: isMediumScreen ? 0 : "1rem" }}>
            <Box sx={{ display: "flex", justifyContent: 'space-evenly' }}>

                <FlexBetween gap={2} >
                    {theme.palette.mode === 'dark' ? (
                        <RiSunLine style={{ fontSize: '1.5rem', color: text }} />
                    ) : (
                        <RiMoonLine style={{ fontSize: '1.5rem', color: text }} />
                    )}
                    {isMediumScreen ? "" :
                        <>
                            <BiMessageDetail style={{ fontSize: '1.5rem', color: text }} />
                            <IoNotificationsOutline style={{ fontSize: '1.5rem', color: text }} /> </>
                    }
                </FlexBetween>
                <Box sx={{ display: 'flex', border: `1px solid ${dark}`, borderRadius: '5px' }}>
                    <Avatar variant="rounded" sx={{ width: 34, height: 34 }} style={{ backgroundColor: dark }} />
                    <Box sx={{ display: { xs:'none',sm: 'none', md: 'flex', lg: 'flex' }, alignItems: 'center', ml: '-1px', backgroundColor: alt, pr: isMediumScreen ? 0 : '0.5rem', borderRadius: "0px 4px 4px 0px" }}>
                        <Box sx={{ p: '5px' }}><Typography sx={{ pl: "5px", fontWeight: '600', color: text }} variant="button">Irin</Typography></Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default NavItems



