import {useEffect} from 'react'
import {isAuth, signout} from '../../actions/auth'
import Router from 'next/router'

const User = ({children})=>{

    useEffect(()=>{
        if(!isAuth()){
            Router.push('/signin')
        }else if(isAuth().role !==0){
            Router.push('/signin')
            signout(()=>Router.replace(`/signin`))
        }
    },[])

    return <React.Fragment>
        {children}
    </React.Fragment>
}

export default User