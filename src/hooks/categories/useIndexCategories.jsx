import React, { useState } from 'react'
import { API } from '../../instance'

function useIndexCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchCategories = async () => {
        await API.get('/categories')
            .then((res) => {
                setCategories(res.data.map((e) => {
                    return { ...e, selected: false }
                }))
                setLoading(false)
            })
    }
    return { categories, fetchCategories, loading, setCategories }
}

export default useIndexCategories