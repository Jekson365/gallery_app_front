import React from 'react'
import { API } from '../../instance'

function useLikePost() {
    const likePost = async (userId, postId) => {
        await API.post("/like_post", { user_id: userId, post_id: postId })
    }
    return { likePost }
}

export default useLikePost