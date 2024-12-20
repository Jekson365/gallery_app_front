import React, { useState } from 'react'
import { API } from '../../instance'

function useCreatePost() {
    const [result, setResult] = useState({})
    const [error, setError] = useState(null)
    const createPost = async (payload) => {
        try {
            const response = await API.post("/posts", { posts: payload },
                {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                })
            const resultData = { message: response.data, status: response.status }
            setResult(resultData)
            setError(null)
            return resultData
        } catch (err) {
            const errorData = {
                message: err.response?.data?.error || 'An unexpected error occurred.',
                status: err.response?.status || 500,
            };
            setError(errorData);
            setResult({}); 
            return errorData;
        }
    }
    return { createPost, result, error }
}

export default useCreatePost