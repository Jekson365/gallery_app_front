import React, { useContext, useState } from 'react'
import { API } from '../../instance'
import { SearchResultContext } from '../../pages/search/Search'

function useSearchPost() {
    const { result, setResult, loading, setLoading } = useContext(SearchResultContext)
    const [data, setData] = useState([])
    const searchPosts = async (payload) => {
        try {
            setLoading(true)
            await API.post('/search_posts', { keyword: payload })
                .then((res) => {
                    setResult(res.data)
                    setLoading(false)
                })
            return data
        }
        catch (err) {
            throw err
        }
    }
    return { searchPosts, data, loading }
}

export default useSearchPost