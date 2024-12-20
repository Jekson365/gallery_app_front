import React from 'react'
import { API } from '../../instance'

function useCreateUser() {
    const createUser = async (payload) => {
        let result = {}
        try {
            const response = await API.post("/users", { user: payload })
                .then((res)=> {
                    result = res
                })
        }
        catch (err) {
            throw err
        }
        return result
    }
    return { createUser }
}

export default useCreateUser