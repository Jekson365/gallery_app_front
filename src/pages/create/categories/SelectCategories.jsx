import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add';
import PlusIcon from '../../../partials/PlusIcon';
import useIndexCategories from '../../../hooks/categories/useIndexCategories';
import Progress from '../../../components/Progress';

function SelectCategories({ selectedCateogires, setSelectedCategories, imageItem }) {

    const { categories, fetchCategories, loading, setCategories } = useIndexCategories()
    const [currentCategories, setCurrentCategories] = useState([])

    const handleCategories = (catId) => {
        let modified = categories.map((e) => {
            if (e.id === catId) {
                return { ...e, selected: !e.selected }
            }
            else {
                return e
            }
        })
        setCategories(modified)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        console.log(categories)
    }, [categories])
    return (
        <>
            <Stack maxWidth={'300px'} mt={3}>
                {loading ? <Progress /> : (<>
                    <Stack
                        direction={'row'}
                        gap={'10px'}
                        alignItems={'center'}
                    >
                        {categories && categories.map((item) => {
                            return (
                                <>
                                    <div className={`keyword-item ${item.selected ? 'selected-cat-item' : null}`}
                                        onClick={() => handleCategories(item.id)}
                                        style={{
                                            padding: "10px 10px"
                                        }}
                                    >{item.name}</div>
                                </>
                            )
                        })}
                    </Stack>
                </>)}
            </Stack>

        </>
    )
}

export default SelectCategories