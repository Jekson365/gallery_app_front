import React, { useContext, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { Search } from '@mui/icons-material'
import useSearchPost from '../../../hooks/search/useSearchPost'
import SearchResult from './SearchResult'
import { SearchResultContext } from '../Search'

function SearchInput() {
    const { result, setResult } = useContext(SearchResultContext)
    const { searchPosts, data, loading } = useSearchPost()
    const [keyword, setKeyWord] = useState('')

    const handleSearch = () => {
        searchPosts(keyword)
        // setResult(data)
    }
    return (
        <>
            <Stack
                direction={'column'}
                minHeight={'30vh'}
                width={'100%'}
                alignItems={'center'}
                gap={'20px'}
                pt={5}
                justifyContent={'flex-start'}
            >
                <h1 className='search-header'>რას ეძებ?</h1>
                <div className='search-cover'>
                    <input type="text" className="search-field"
                        onChange={(e) => setKeyWord(e.target.value)}
                        placeholder='კამერა,მომხმარებელი,კატეგორია...'
                    />
                    <div className='icon'>
                        <Search />
                    </div>
                </div>
                <button className='button-search'
                    onClick={handleSearch}
                >ძებნა</button>
            </Stack>
        </>
    )
}

export default SearchInput