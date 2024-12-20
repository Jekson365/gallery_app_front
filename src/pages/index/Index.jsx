import React, { useEffect, useState } from 'react'
import useIndexPost from '../../hooks/posts/useIndexPost'
import '../../styles/post.scss'
import { API } from '../../instance';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import FullScaleImage from '../../components/FullScaleImage';
import { Link } from 'react-router-dom';
import BackHandIcon from '@mui/icons-material/BackHand';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import useLikePost from '../../hooks/posts/useLikePost';
import Grid from '@mui/material/Grid'
import cable from '../../channel/cable';
import consumer from '../../channel/cable'

function Index() {
  const [items, setItems] = useState([]);
  const { likePost } = useLikePost()
  const [fullScale, setFullScale] = useState({ image: '', open: '' })
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasMore && !loading) {
      fetchItems();
    }
  }, [page]);

  const fetchItems = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await API.get(`/randomize_posts?page=${page}&items=5`);
      setItems((prev) => [...prev, ...response.data.items]);
      setHasMore(response.data.pagination.next != null);
    } catch (error) {
      console.error("Error fetching items", error);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loading) setPage((prev) => prev + 1);
    }
  };

  const handleFullScale = (image, data) => {
    setFullScale({ image: API.defaults.baseURL + '/uploads/' + image, open: true, data })
  }

  const handleLikePost = (userId, postId, currentLikes, liked = false) => {
    if (!liked) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === postId
            ? { ...item, like_count: currentLikes + 1, liked: true }
            : item
        )
      );
      likePost(userId, postId)
    }
  }

  useEffect(() => {
    console.log(items)
  }, [items])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      {fullScale.image ? (<>
        <FullScaleImage
          image={fullScale.image}
          open={fullScale.open}
          data={fullScale.data}
          setOpen={setFullScale}
        />
      </>) : null}
      <div
      >
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Stack gap={'50px'}
              justifyContent={'center'}
              style={{
                maxWidth: "600px",
                margin: "0px auto",
              }}
              width={'100%'}>
              {items && items.map((item, index) => (
                <>
                  <Stack
                    direction={'column'} gap={'10px'} justifyContent={'center'}>
                    <Box
                      onClick={() => handleFullScale(item.image, item)}
                      className='post-image'
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        aspectRatio: "1",
                        backgroundSize: "cover",
                        backgroundImage: `url('${API.defaults.baseURL + '/uploads/' + item.image}')`,
                        backgroundPosition: "center",
                      }}
                    >
                    </Box>
                    <Stack
                      direction={'column'}
                      maxWidth={'600px'}
                      alignItems={'flex-start'}
                      className='post-content'
                      gap={'10px'}
                      mt={1}
                    >
                      <Stack direction={'row'} gap={'10px'} alignItems={'center'}>

                        <div onClick={() => handleLikePost(item.user_id, item.id, item.like_count, item.liked)}>
                          <ThumbUpIcon className={`like-icon ${item.liked ? 'liked' : ''}`} />
                        </div>
                        <div className='counter'>{item.like_count}</div>
                      </Stack>
                      <Stack direction={'row'}
                        width={'100%'}
                        justifyContent={'space-between'}>
                        {/* <div className='author'>
                      <Link to={`/profile/${item.user_id}`}>
                        {item.name}
                      </Link>
                    </div> */}
                      </Stack>
                      <Stack direction={'column'} gap={'15px'} mt={0}>
                        <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                          <div className='author'>
                            <Link to={`/profile/${item.user_id}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className='description'>{item.description}</div>
                        </Stack>
                        <div className='date'>{item.date}</div>
                      </Stack>
                    </Stack>
                    <div className="line"
                      style={{ background: "gray", width: "100%", height: "1px", }}
                    ></div>
                  </Stack>
                </>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
        {loading && <p>Loading...</p>}
      </div>
    </>
  )
}

export default Index