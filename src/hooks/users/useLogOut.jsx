import React, { useState } from 'react'
import { API } from '../../instance'

function useLogOut() {
    const [res, setRes] = useState({})
    const logoutUser = async () => {
        try {
            await API.delete('/logout')
                .then((res) => {
                    setRes(res)
                    window.location.href = '/'
                })
        }
        catch (err) {
            throw err
        }
    }
    return { res, logoutUser }


}


export default useLogOut