import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Message from '../../components/Message'
import useCreateUser from '../../hooks/users/useCreateUser'

function Register() {
    const [popUpData, setPopUpData] = useState({ open: false, message: "", severity: "" })
    const { createUser } = useCreateUser()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        profession: "",
        city: "",
        password: "",
        password_confirmation: ""
    })

    const handleUserData = (event) => {
        const { value, name } = event.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = async () => {
        const { name, email, profession, city, password, password_confirmation } = userData
        if (name == '' || email == '' || profession == '' || city == '' || password == '' || password_confirmation == '') {
            setPopUpData({ open: true, message: "ყველა ველის შევსება აუცილებელია", severity: "error" })
        }
        else if (name.length <= 1) {
            setPopUpData({ open: true, message: "სახელი უნდა იყოს ერთ სიმბოლოზე მეტი", severity: "error" })
        }
        else if (password !== password_confirmation) {
            setPopUpData({ open: true, message: "პაროლები არ ემთხვევა ერთმანეთს", severity: "error" })
        }
        else {
            const result = await createUser(userData)
            if (result.status == 200) {
                setPopUpData({ open: true, message: "მომხმარებელი რეგისტრირებულია", severity: "success" })
                window.location.href = '/login'
            }
        }
        setTimeout(() => {
            setPopUpData({ open: false, message: "" })
        }, [2000])
    }
    useEffect(() => {
        console.log(userData)
    }, [userData])
    return (
        <>
            {popUpData.open && <Message data={popUpData} />}
            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} md={6}>
                    <input type="text" className="new-image-input"
                        onChange={(e) => handleUserData(e)}
                        name='name'
                        placeholder='სახელი'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <input type="email" className="new-image-input"
                        onChange={(e) => handleUserData(e)}
                        name='email'
                        placeholder='ელ-ფოსტა'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <input type="text" className="new-image-input"
                        onChange={(e) => handleUserData(e)}
                        name='profession'
                        placeholder='პროფესია'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <input type="text" className="new-image-input"
                        onChange={(e) => handleUserData(e)}
                        name='city'
                        placeholder='ქალაქი'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <input type="password" className="new-image-input"
                        name='password'
                        onChange={(e) => handleUserData(e)}
                        placeholder='პაროლი'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <input type="password" className="new-image-input"
                        onChange={(e) => handleUserData(e)}
                        name='password_confirmation'
                        placeholder='გაიმეორეთ პაროლი'
                    />
                </Grid>
            </Grid>
            <button
                style={{marginTop:"20px"}}
                className='button-primary'
                onClick={handleSubmit}
            >შესვლა</button>

        </>
    )
}

export default Register