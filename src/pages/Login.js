import React, { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Login() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    {/*const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('user-info')){
            history.push("/add")
        }
    }, [])*/}
    async function login()
    {
        console.warn(username,password)
        let credentials={username,password};
        let result= await fetch("https://sunilregmi233.pythonanywhere.com/api/v1/dj-rest-auth/login/",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(credentials)
        })

    }

  return (
      <div className="App">
      <Navbar/>
      
      <h1>Login Page</h1>
      <div className='col-sm-6 offset-sm-3'>
        <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} className='form-control' />
        <br/>
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} className='form-control' />
        <br/>
        <button onClick={login} className='btn btn-primary' >Login</button>

      </div>
    </div>
  )
}
