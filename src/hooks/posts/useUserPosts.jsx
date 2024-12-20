import React, { useState } from 'react'
import { API } from '../../instance'

function useUserPosts() {
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const fetchPosts = async (userId) => {
        try {
            await API.get(`/index_by_users?user_id=${userId}`)    
                .then((res)=> {
                    setPosts(res.data)
                    setLoading(false)
                })
        }
        catch(err) {
            throw err
        }
    }
    return { posts,loading,fetchPosts,setPosts}
}

export default useUserPosts