import React, { createContext, useEffect, useState } from 'react'
import SearchInput from './components/SearchInput'
import SearchResult from './components/SearchResult'
import '../../styles/search.scss'
import Stack from '@mui/material/Stack'
import { BlurCircularOutlined } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress';
import KeyWords from './components/KeyWords'


export const SearchResultContext = createContext({})

function Search() {
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)

    return (
        <>
            <SearchResultContext.Provider value={{ result, setResult, loading, setLoading }}>
                <SearchInput />
                <KeyWords/>
                {loading ? (<>
                    <Stack direction='row' justifyContent={'center'}>
                        <CircularProgress/>
                    </Stack>
                </>) : (<>
                    <SearchResult data={result} />
                </>)}
            </SearchResultContext.Provider>
        </>
    )
}

export default Search