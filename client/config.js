import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()


export const API = publicRuntimeConfig.PRODUCTION ? 'https://hii.com' : publicRuntimeConfig.API_DEVELOPMENT

export const CLOUDINARY= publicRuntimeConfig.CLOUDINARY_FOLDER

export const CLOUDINARY_URL= publicRuntimeConfig.CLOUDINARY_URL