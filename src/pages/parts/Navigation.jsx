import { Box, Stack } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { API } from '../../instance'
import useCurrentUser from '../../hooks/users/useCurrentUser'
import { CurrentUserContext } from '../../App'
import useLogOut from '../../hooks/users/useLogOut'
import { Link } from 'react-router-dom'
import cable from '../../channel/cable'



function Navigation() {
    const { currentUser } = useContext(CurrentUserContext)
    const { logoutUser } = useLogOut()

   
    return (
        <>
            <Stack direction={'row'} alignItems={'center'}
                justifyContent={'space-between'}
                gap={'10px'}
            >
                <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
                    <Box
                        style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#8B5DFF" }}
                    ></Box>
                    <Stack
                        direction={'column'}
                        alignItems={'flex-start'}
                        justifyContent={'center'}
                        gap={'3px'}
                    >
                        <h3 className='c-white'>
                            <Link to={'/profile'} style={{ color: "white", textDecoration: "none" }}>
                                {currentUser ? currentUser.name : ''}
                            </Link>
                        </h3>
                        <p className='c-pink'
                            style={{ fontSize: "13px", letterSpacing: "0.5px", fontWeight: "bold" }}
                        >{currentUser ? currentUser.profession : ''}</p>
                    </Stack>
                </Stack>
                <Box>
                    <Stack direction={'row'} gap={'7px'}>

                        {currentUser ? (<>
                            <button className='button-primary'>
                                <a href='/new'>შექმნა</a>
                            </button>
                        </>) : null}
                        {currentUser ? (<>
                            <button className='button-primary' onClick={logoutUser}>
                                <a>გასვლა</a>
                            </button>
                        </>) : <>
                            <button className='button-primary'>
                                <a href='/login'>ავტორიზაცია</a>
                            </button>
                        </>}
                    </Stack>
                </Box>
            </Stack>
            <div className="line"></div>
        </>
    )
}

export default Navigation