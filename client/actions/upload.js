import {CLOUDINARY_URL, CLOUDINARY} from '../config'
import fetch from 'isomorphic-fetch'


export const uploadImage=(image)=>{
    console.log(CLOUDINARY_URL, 'From Action')
    return fetch(`${CLOUDINARY_URL}`,{
        method:'POST',
        body: image
    }).then(response=>{
        return response.json()
    }).catch(err =>console.log(err))
}