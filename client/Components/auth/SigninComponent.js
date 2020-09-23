const { useState } = require("react")


const SigninComponent =()=>{

    const [values, setValues]= useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm: true
    })

    const {email, password, error, loading, message, showForm}= values;
}