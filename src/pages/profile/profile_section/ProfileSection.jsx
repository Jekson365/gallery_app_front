import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { API } from '../../../instance'
import FullScaleImage from '../../../components/FullScaleImage'


function ProfileSection({ posts }) {
    const [open, setOpen] = useState(false)
    const [currentImage, setCurrentImage] = useState('')
    const [currentPost, setCurrentPost] = useState({})
    const determineClassName = (index) => {
        let className = ''
        if (index % 6 === 0) {
            className = 'div1'; // For 0, 6, 12, 18, ...
        }
        else if (index % 6 === 1) {
            className = 'div4'; // For 1, 7, 13, 19, ...
        } else if (index % 6 === 2) {
            className = 'div5'; // For 3, 9, 15, 21, ...
        } else if (index % 6 === 3) {
            className = 'div6'; // For 4, 10, 16, 22, ...
        } else if (index % 6 === 4) {
            className = 'div7'; // For 5, 11, 17, 23, ...
        }
        return className
    }
    const handleFullScaleImage = (imageName,post) => {
        setOpen(true)
        setCurrentPost(post)
        setCurrentImage(API.defaults.baseURL + '/uploads/' + imageName)
    }
    return (
        <>
            <FullScaleImage image={currentImage} open={open} setOpen={setOpen} data={currentPost} />
            <div class="parent">
                {posts.map((post, index) => {
                    return (
                        <div
                            onClick={() => handleFullScaleImage(post.image, post)}
                            className={`${determineClassName(index)} child-div`}
                            style={{
                                backgroundImage:
                                    `url("${API.defaults.baseURL + '/uploads/' + post.image}")`
                            }}
                        >
                            <div className="coverlay"></div>
                            <div className="content">
                                <Stack direction={'column'} alignItems={'flex-end'}>
                                    <h1 className="c-white">{post.title}</h1>
                                    <p className="c-white">{post.description}</p>
                                </Stack>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default ProfileSection