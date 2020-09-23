import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()


export const API = publicRuntimeConfig.PRODUCTION ? 'https://hii.com' : publicRuntimeConfig.API_DEVELOPMENT