import React, { useState } from 'react'
import { API } from '../../instance'

function useIndexPost() {
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const fetchPosts = async (page) => {
        const response = await API.post('/randomize_posts',
            {
                params: { page, per_page: 5 }
            }
        )
        setPosts((prev) => [...prev, response.data])
        if (posts.length === 0) setHasMore(false);
    }
    return { posts, fetchPosts, hasMore }
}

export default useIndexPost

