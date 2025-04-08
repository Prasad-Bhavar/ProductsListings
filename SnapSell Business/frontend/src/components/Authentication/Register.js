import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Register.css';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';

export default function Register(){

  const [registeredInfo,setRegisteredInfo]=useState({
    username:'',
    email:'',
    password:''
  })
const navigate = useNavigate();
  const handleChange=(e)=>{
    const {name,value} = e.target;
    const copyRegisteredInfo = {...registeredInfo};
    copyRegisteredInfo[name]=value;
    setRegisteredInfo(copyRegisteredInfo);
  }
  // console.log(registeredInfo);

  const handleRegistered=async (e)=>{
    e.preventDefault();
    const {username,email,password}=registeredInfo;
    if(!username || !email || !password){
      return handleError('usernamme,email and password required');
    }

    try{
      const url = 'http://localhost:8080/user/register';
      const response = await fetch(url,{
        method:'post',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify(registeredInfo)
      });

      const result = await response.json();
      const {success,message,error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/user/login');
        },1000);
      } else if(error){
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success){
        handleError(message);
      }
      console.log(result);

    } catch(err){
      handleError(err);
    }
}


    return(
    <div >
        <form className='form-style offset-4 mt-4 mb-4' onSubmit={handleRegistered} >
                <div class="mb-3">
                          <label for="exampleInputUsername1" class="form-label">Username</label>
                          <input type="text" onChange={handleChange} value={registeredInfo.username} class="form-control" id="exampleInputUsername1" name='username' autoFocus placeholder=' Enter Username'  />
                        </div>
                      <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Email address</label>
                          <input type="email" onChange={handleChange} value={registeredInfo.email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoFocus placeholder=' Enter Email' name='email'  />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">Password</label>
                          <input type="password" onChange={handleChange} value={registeredInfo.password} class="form-control" id="exampleInputPassword1" name='password' autoFocus placeholder=' Enter Password'  />
                        </div>
                        <div>
                          <p>Already have an account? &nbsp;<Link style={{color:'black', textDecoration:'none'}} to={'/user/login'}>login</Link> </p>
                        </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <ToastContainer/>
    </div>
    )
}