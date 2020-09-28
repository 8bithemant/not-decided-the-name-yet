import {useEffect} from 'react'
import Router from 'next/router'
import {isAuth} from '../../actions/auth'
import {signout} from '../../actions/auth'

const Admin =({children})=>{

    useEffect(()=>{
        if(!isAuth()){
            Router.push('/signin')
        }else if(isAuth().role !== 1){
            signout(()=>Router.replace(`/signin`))
        }
    },[])
    
    
    return <React.Fragment>
            {children}
        </React.Fragment>
}

export default Admin