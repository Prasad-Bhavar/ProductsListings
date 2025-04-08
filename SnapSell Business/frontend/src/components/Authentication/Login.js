import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Register.css';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';

function Login(){
    const [loginInfo,setLoginInfo]=useState({
        username:'',
        password:''
      })
    const navigate = useNavigate();
      const handleChange=(e)=>{
        const {name,value} = e.target;
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
      }
      console.log(loginInfo);
    
      const handleLogin=async (e)=>{
        e.preventDefault();
        const {username,password}=loginInfo;
        if(!username || !password){
          return handleError('usernamme and password required');
        }
    
        try{
          const url = 'http://localhost:8080/user/login';
          const response = await fetch(url,{
            method:'post',
            headers:{
              'content-type':'application/json',
            },
            body:JSON.stringify(loginInfo)
          });
    
          const result = await response.json();
          const {success,message,error,token,email} = result;
          if(success){
            handleSuccess(message);
            localStorage.setItem('token',token);
            localStorage.setItem('LoggedInUser', username);
            localStorage.setItem('LoggedInUserEmail', email);
            setTimeout(()=>{
              navigate('/home');
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
        <form className='form-style offset-5 mt-4 mb-4' onSubmit={handleLogin} >
                <div class="mb-3">
                          <label for="exampleInputUsername1" class="form-label">Username</label>
                          <input type="text" onChange={handleChange} value={loginInfo.username} class="form-control" id="exampleInputUsername1" name='username' autoFocus placeholder=' Enter Username'  />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">Password</label>
                          <input type="password" onChange={handleChange} value={loginInfo.password} class="form-control" id="exampleInputPassword1" name='password' autoFocus placeholder=' Enter Password'  />
                        </div>
                        <div>
                          <p>Don't have an account? &nbsp;<Link style={{color:'black', textDecoration:'none'}} to={'/user/register'}>Register</Link> </p>
                        </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <ToastContainer/>
    </div>
    )
}

export default Login;