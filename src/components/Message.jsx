import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function Message({ data }) {
    const [open, setOpen] = useState(data.open)
    useEffect(()=> {
        setOpen(data.open)
    },[data.open])
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={data.severity}>
                    {data.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Message