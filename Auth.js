import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { authActions } from "../store";

function Auth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ inputs , setinputs] = useState({
     name:"",email:"",password:""
  })
    
  const change = (e)=>{
    e.preventDefault();
    setisSignup(!isSignup);
  }
  const handleChange = (e)=>{       
    setinputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
    }))
  }

  const [ isSignup , setisSignup] = useState(false)

  const sendRequest = async (type="login")=>{
    const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password

    }).catch((err)=>console.log(err));

    const data = await res.data;
    console.log(data)
    return data;
  }
   
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    if(isSignup){
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data))
    }else{
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data))
    }

    
  }

  return (
    <div className='login'>
          <div className='form'>
               <form onSubmit={handleSubmit} className ='submitform'>             
                   <h1>{isSignup ? "Signup" : "Login"}</h1>
                   {isSignup && <input type="text" placeholder='Name' value={inputs.name} onChange={handleChange} name="name"/>}
                   <input type="email" placeholder='Email' value={inputs.email} onChange={handleChange} name="email"/>
                   <input type="password" placeholder='Password' value={inputs.password} onChange={handleChange} name="password"/>
                   <button type='submit' className='button'>Submit</button>
                   <button className='signupp' onClick={change}> Create new account? {isSignup ? "Login" : "Signup"}</button>
               </form>
          </div>
    </div>
  )
}

export default Auth;