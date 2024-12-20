import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { API } from '../../../instance'
import FullScaleImage from '../../../components/FullScaleImage'
import useSearchPost from '../../../hooks/search/useSearchPost'
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function SearchResult({ data }) {
  const [open, setOpen] = useState(null)
  const [currentImage, setCurrentImage] = useState({})

  const handleCurrentImage = (image) => {
    setCurrentImage(image)
    setOpen(true)
  }
  return (
    <>
      <FullScaleImage image={API.defaults.baseURL + '/uploads/' + currentImage.image} open={open} setOpen={setOpen} data={currentImage} />
      <Grid container  rowSpacing={3} columnSpacing={3} mt={3}>
        {data && data.map((item) => {
          return (
            <>
              <Grid item xs={12} md={4}>
                <div className="search-result-item"
                  onClick={() => handleCurrentImage(item)}
                >
                  <div className="backlay"></div>
                  <div className="eye">
                    <RemoveRedEyeIcon
                      style={{fontSize:"60px"}}
                    />
                  </div>
                  <img
                    src={API.defaults.baseURL + '/uploads/' + item.image} />
                </div>
              </Grid>
            </>
          )
        })}
      </Grid>
    </>
  )
}

export default SearchResult