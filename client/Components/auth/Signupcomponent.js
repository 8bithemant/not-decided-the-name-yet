import {useEffect, useState} from 'react'
import {Signup, isAuth} from '../../actions/auth';


const SignupComponent=()=>{
    
    const [values,setValues]= useState({
        firstName:'',
        lastName:'',
        error:'',
        email:'',
        password:'',
        rePassword:'',
        loading: false,
        message:'',
        showForm:true
    })

    const {firstName,email, lastName, error, password,rePassword, loading, message, showForm}= values;
    

    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()

        setValues({...values, loading:true, error: false})

        const user={firstName, lastName, email, password, rePassword}

        Signup(user).then(data=>{
            if(data.error){
                setValues({...values, loading:false, error: data.error})
            }else{
                setValues({...values, firstName:'', lastName:'', email:'', password:'', rePassword:'', loading:false, message:data.message, showForm:false, error: ''})
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
        setValues({...values, error: false, [name]: e.target.value})
    }


    const signupForm=()=>{
        return <form className="form" onSubmit={handleSubmit}>
                <div className="signup-form-group">
                    <input type="text"  value={firstName} onChange={handleChange('firstName')} placeholder="Type Your Name Here"/>
                </div> 
                <div className="signup-form-group">
                    <input type="text"  value={lastName} onChange={handleChange('lastName')} placeholder="Type Your Last Name Here"/>
                </div>
                <div className="signup-form-group">
                    <input type="text"  value={email} onChange={handleChange('email')} placeholder="Enter Your Email Address"/>
                </div>
                <div className="signup-form-group">
                    <input type="password"  value={password} onChange={handleChange('password')} placeholder="Enter Your Password"/>
                </div>
                <div className="signup-form-group">
                    <input type="password"  value={rePassword} onChange={handleChange('rePassword')} placeholder="Re Enter Your Password "/>
                </div>
                <div>
                    <button className="btn btn-primary">
                        Signup
                    </button>
                </div>
            </form>
    }

    return (
        <React.Fragment>
            <div className="show-updates">
            {showError()}
            {showLoading()}
            {showMessage()}
            </div>
            {showForm && signupForm()}
        </React.Fragment>
    )
}

export default SignupComponent