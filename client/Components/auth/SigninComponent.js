import Router  from 'next/router'
import { useEffect, useState } from 'react'
import {Signin, authenticate, isAuth} from '../../actions/auth'

const SigninComponent =()=>{

    const [values, setValues]= useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm: true
    })

    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])

    const {email, password, error, loading, message, showForm}= values;

    const handleSubmit=(e)=>{
        e.preventDefault()

        setValues({...values, loading:true,error:false})

        const user={email, password}

        Signin(user).then(data=>{
            if(data.error){
                setValues({...values, error: data.error, loading:false})

            }else{
                authenticate(data, ()=>{
                    if(isAuth() && isAuth().role ===1){
                        Router.push(`/`)
                    }else{
                        Router.push(`/`)
                    }
                })
            }
        })
    }

    const showLoading=()=>(
        loading ? <div className="show-loading">
            Loading....
        </div> :''
    )
    const showError=()=>(
        error ? <div className="show-error">
            {error}
        </div> :''
    )
    const showMessage=()=>(
        message ?
        <div className="show-message">
            {message}
        </div>: ''
    )

    const handleChange=(name)=>e=>{
        setValues({...values, [name]: e.target.value,error:false})
    }

    const signinForm =()=>{
        return <form onSubmit={handleSubmit} className="form">
            <div className="signin-form-group">
                <input placeholder="Type Your Email" type="email" onChange={handleChange('email')} value={email}/>
            </div>
            <div className="signin-form-group">
                <input placeholder="Type Your Password" type="password"  onChange={handleChange('password')} value={password}/>
            </div>
            <button className="btn btn-primary">
                Siginin
            </button>
        </form>
    }

    return(
        <React.Fragment>
            <div className="show-updates">
                {showError()}
                {showLoading()}
                {showMessage()}
            </div>
            {showForm && signinForm()}
        </React.Fragment>
    )
    
}

export default SigninComponent