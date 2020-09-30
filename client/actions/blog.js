import fetch from 'isomorphic-fetch'
import {API} from '../config'
import queryString from 'querystring'
import {isAuth} from './auth'

export const createBlog =(blog, token)=>{
    
    return fetch(`${API}/blog`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blog)
    }).then(response=>{
        return response.json()
    }).catch(err => console.log(err))
}