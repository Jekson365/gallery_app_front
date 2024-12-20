import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../instance'
import { CurrentUserContext } from '../../App'
import Stack from '@mui/material/Stack'

function Login() {
    const { currentUser } = useContext(CurrentUserContext)
    useEffect(() => {
        if (currentUser != null || currentUser != undefined) {
            window.location.href = '/profile'
            console.log("user is logged in")
        }
    }, [currentUser])
    const [user, setUser] = useState({ email: "", password: "" })
    const authUser = async () => {
        try {
            await API.post('/login', user, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                })
            window.location.href = '/profile'
        } catch (err) {
            throw err
        }
    }
    return (
        <>
            <Stack direction={'column'} alignItems={'flex-start'} gap={'20px'} maxWidth={'450px'} mt={3}>
                <input type="email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder='ელ-ფოსტა' className='new-image-input' />
                <input type="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder='პაროლი' className='new-image-input' />
                <a className='links' href='/register'>არ გაქვს ექაუნთი?</a>
                <button
                    className='button-primary'
                    onClick={authUser}
                >შესვლა</button>
            </Stack>
        </>
    )
}

export default Login