import React from 'react'
import Head from 'next/head'

{/**
  CSS Import's
*/}
// main.css
import '../static/styles/styles.css'
//header.css
import '../static/styles/navbar.css'
// main-header.css
import '../static/styles/main-header.css'
// signup 
import '../static/styles/signup.css'
// signin

import '../static/styles/signin.css'
// create Category
import '../static/styles/createCategory.css'

import '../node_modules/react-quill/dist/quill.snow.css';

function MyApp({ Component, pageProps }) {
    return (
      <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
  
  export default MyApp