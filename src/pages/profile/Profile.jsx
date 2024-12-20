import React, { useEffect, useState } from 'react'
import '../../styles/index.scss'
import Stack from '@mui/material/Stack'
import Navigation from '../../pages/parts/Navigation'
import useUserPosts from '../../hooks/posts/useUserPosts'
import Box from '@mui/material/Box'
import ProfileSection from './profile_section/ProfileSection'
import { API } from '../../instance'
import FullScaleImage from '../../components/FullScaleImage'

function Profile() {
  const { posts, loading, fetchPosts } = useUserPosts()

  const [userId] = useState(window.location.href.split("/")[4])
  const [modifiedFinalArray, setModified] = useState([])

  useEffect(() => {
    fetchPosts(userId)
  }, [])

  useEffect(() => {
    const groupedArr = [];
    for (let i = 0; i < posts.length; i += 5) {
      groupedArr.push(posts.slice(i, i + 5));
    }
    setModified(groupedArr)
  }, [posts])

  return (
    <>
      {/* <FullScaleImage /> */}
      {loading ? (
        <>loading...</>
      ) : (
        <>
          {modifiedFinalArray && modifiedFinalArray.map((posts) => {
            return (
              <>
                <Box mt={5}></Box>
                <ProfileSection posts={posts} />
                <div className="line"></div>
              </>
            )
          })}
        </>
      )}
    </>
  )
}

export default Profile