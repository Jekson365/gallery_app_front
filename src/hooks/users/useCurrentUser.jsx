import React, { useEffect, useState } from 'react'
import { API } from '../../instance'

function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState(null)
    const getCurrentUser = async () => {
        await API.get('/current')
            .then((res) => {
                setCurrentUser(res.data)    
            })
    }
    return { currentUser,getCurrentUser }
}


export default useCurrentUser