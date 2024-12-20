import React, { createContext, useEffect, useState } from 'react'
import BackDrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'


function FullScaleImage({ image, open, setOpen, data }) {
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <>
            <BackDrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={handleClose}
            >
                {image ? (
                    <>
                        <Grid
                            container
                            p={2}
                            style={{ maxWidth: "1000px", background: "white" }}
                        >
                            <Grid item md={6} xs={12}>
                                <img src={image}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Stack
                                    pt={{ md: 0, xs: 3 }}
                                    pl={{ md: 3, xs: 0 }}
                                    direction={'column'}
                                    justifyContent={'space-between'}
                                    alignItems={'flex-start'}
                                    className='properties'
                                    height={'100%'}
                                    gap={'30px'}
                                >
                                    <Stack direction={'column'}
                                        justifyContent={'flex-start'}
                                        gap={'30px'}
                                    >
                                        <Stack direction={'column'} gap={'10px'}>
                                            <div className='title'>დასახელება</div>
                                            <div className='description'>სატესტო აღწერა. განკუთვნილი ვიზუალისთვის. ასევე შესაძლებელია ლორემის გამოყენება მარა დასერჩვას და დაკოპირებას ასე წერა მირჩევნია. ჰაჰაჰა.</div>
                                        </Stack>
                                        <Stack direction={'column'} gap={'10px'}>
                                            <div className='camera'><span>კამერა: </span> {data.camera}</div>
                                            <div className='model'><span>მოდელი: </span> {data.model}</div>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'column'} gap={'10px'} pb={3}>
                                        <div className='location'><span>ლოკაცია: </span> {data.image_location}</div>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </>

                ) : <CircularProgress />}
            </BackDrop>
        </>
    )
}

export default FullScaleImage