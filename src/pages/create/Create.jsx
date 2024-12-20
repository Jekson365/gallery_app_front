import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close';
import useCreatePost from '../../hooks/posts/useCreatePost'
import Button from '@mui/material/Button'
import { VisuallyHiddenInput } from '../../styles/styled/Customs'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Message from '../../components/Message'
import UploadIcon from '@mui/icons-material/Upload';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SelectCategories from './categories/SelectCategories'




function Create() {
    const [images, setImages] = useState([])
    const [popUpData, setPopUpData] = useState({ open: false, message: "" })
    const [selectedCateogires, setSelectedCategories] = useState([])
    const { createPost, result, error } = useCreatePost()

    const handlePostCreate = async () => {
        const invalidImages = images.filter(image => !image.title || !image.description);
        if (invalidImages.length > 0) {
            setPopUpData({
                message: "ყველა სურათს უნდა ჰქონდეს სათაური და აღწერა",
                open: true,
                severity: "error"
            });
            setTimeout(() => {
                setPopUpData({ open: false, message: "" });
            }, 2000);
            return;
        }
        const response = await createPost(images)
        if (response.status === 200) {
            setPopUpData({ message: 'წარმატებით შეინახა', open: true, severity: 'success' });
            setInterval(() => { }, 2000)
            window.location.reload()
        } else {
            setPopUpData({ message: response.message, open: true, severity: 'error' });
        }
    }

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files).map((file) => ({
            id: uuidv4(),
            image: file,
            title: '',
            description: '',
            categories: []
        }));
        setImages((prevImages) => [...prevImages, ...newFiles]);
    };
    const handleImageRemove = (id) => {
        const filtered = images.filter((item) => item.id !== id)
        setImages(filtered)
    }
    const handleDescriptions = (event, id) => {
        const { name, value } = event.target;

        const updatedImages = images.map((item) => {
            if (item.id === id) {
                return { ...item, [name]: value };
            }
            return item;
        });
        setImages(updatedImages);
    };
    const handleSameGraphs = (event) => {
        const { name, checked } = event.target
        if (name == 'camera' && checked) {
            const firstCameraName = images[0]?.camera;

            if (firstCameraName && checked) {
                const updatedImages = images.map((item) => ({
                    ...item,
                    camera: firstCameraName,
                }));
                setImages(updatedImages);
            }
        }
        else if (!checked && name == 'camera') {
            const updatedImages = images.map((item) => ({
                ...item,
                camera: '',
            }));
            setImages(updatedImages);
        }

        if (name == 'image_location' && checked) {
            const firstLocationName = images[0]?.image_location;

            if (firstLocationName) {
                const updatedImages = images.map((item) => ({
                    ...item,
                    image_location: firstLocationName,
                }));
                setImages(updatedImages);
            }
        }
        else if (!checked && name == 'image_location') {
            const updatedImages = images.map((item) => ({
                ...item,
                image_location: '',
            }));
            setImages(updatedImages);
        }

    }
    useEffect(() => {
        console.log(images)
    }, [images])
    return (
        <>
            {popUpData.open && <Message data={popUpData} />}
            <Box mt={3}></Box>
            <Stack
                direction={'row'}
                gap={'10px'}
            >
                <Stack direction={'row'} gap={'5px'} alignItems={'center'}>
                    <div style={{ color: "white" }}>საერთო კამერა</div>
                    <Switch onChange={handleSameGraphs} name='camera' style={{ color: "#FF4545" }} />
                </Stack>
                <Stack direction={'row'} gap={'5px'} alignItems={'center'}>
                    <div style={{ color: "white" }}>საერთო ლოკაცია</div>
                    <Switch onChange={handleSameGraphs} name='image_location' style={{ color: "#FF4545" }} />
                </Stack>
            </Stack>
            {images.length <= 0 ? (<>
                <div className="upload-button-cover">
                    <Button variant='contained'
                        className='upload-button'
                        style={{ minWidth: "60px" }}
                        role={undefined}
                        tabIndex={-1}
                        component='label'
                    >
                        <Stack direction={'column'} alignItems={'center'}>
                            <UploadIcon className='up-icon' />
                            <Stack
                                direction={'row'} gap={'10px'}
                                className='formats'
                            >
                                <Box className='format'>JPEG</Box>
                                <Box className='format'>PNG</Box>
                                <Box className='format'>JPG</Box>
                            </Stack>
                        </Stack>
                        <VisuallyHiddenInput
                            type='file'
                            onChange={handleFileChange}
                            multiple
                            accept=".jpg,.jpeg,.png"
                        ></VisuallyHiddenInput>
                    </Button>
                </div>
            </>) : null}
            <Grid container spacing={4} mt={0}>
                {images && images.map((imageItem, index) => {
                    return (
                        <>
                            <Grid item sx={12} md={6}>
                                <Box
                                    style={{
                                        width: "100%",
                                        overflow: "hidden",
                                        maxHeight: "300px",
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "5px",
                                        boxShadow: "0 0px 30px 1px rgba(0,0,0,0.5)"
                                    }}>
                                    <div className="remove-button"
                                        onClick={() => handleImageRemove(imageItem.id)}
                                    >
                                        <CloseIcon />
                                    </div>
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                        src={URL.createObjectURL(imageItem.image)}
                                    />
                                </Box>
                                <Stack
                                    mt={3}
                                    gap={'19px'}
                                    direction={'column'}
                                    alignItems={'flex-start'}
                                >
                                    <input placeholder='დასახელება'
                                        name='title'
                                        onChange={(e) => handleDescriptions(e, imageItem.id)}
                                        className='new-image-input' />
                                    <input placeholder='აღწერა'
                                        name='description'
                                        onChange={(e) => handleDescriptions(e, imageItem.id)}
                                        className='new-image-input' />
                                    <input placeholder='ლოკაცია'
                                        name='image_location'
                                        value={imageItem.image_location}
                                        onChange={(e) => handleDescriptions(e, imageItem.id)}
                                        className='new-image-input' />
                                    <input placeholder='კამერა'
                                        value={imageItem.camera}
                                        name='camera'
                                        onChange={(e) => handleDescriptions(e, imageItem.id)}
                                        className='new-image-input' />
                                    <input placeholder='მოდელი'
                                        name='model'
                                        onChange={(e) => handleDescriptions(e, imageItem.id)}
                                        className='new-image-input' />
                                </Stack>
                            </Grid>
                            {index == images.length - 1 ? (<>
                                <Grid item sx={12} md={6}>
                                    <Button variant='contained'

                                        className='upload-button'
                                        style={{ minWidth: "100%" }}
                                        role={undefined}
                                        tabIndex={-1}
                                        component='label'
                                    >
                                        <Stack direction={'column'} alignItems={'center'}>
                                            <UploadIcon className='up-icon' />
                                        </Stack>
                                        <VisuallyHiddenInput
                                            type='file'
                                            onChange={handleFileChange}
                                            multiple
                                        ></VisuallyHiddenInput>
                                    </Button>
                                </Grid>
                            </>) : null}
                        </>
                    )
                })}
            </Grid>
        
            <SelectCategories   
                selectedCateogires={images}
                setSelectedCategories={setImages} />
            <Box mt={5}></Box>
            {images.length > 0 ? (<>
                <button onClick={handlePostCreate} className='button-save button-primary'>შენახვა</button>
            </>) : null}
        </>
    )
}

export default Create