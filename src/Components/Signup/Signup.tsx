
import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FireBaseContext } from '../../store/Context';
import {useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth/web-extension';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';


export default function Signup() {
  const [username,setUsername]=useState<string>("")
  const [mobile,setMobile]=useState<string>("")
  const [email,setEmail]=useState<string>("")
  const [password,setPassowrd]=useState<string>("")
  const [erroEmail,setErroEmail]=useState<string>("")
  const [erroName,setErroName]=useState<string>("")
  const [erroPhone,setErroPhone]=useState<string>("")
  const [erroPass,setErroPass]=useState<string>("")

  const  Navigate=useNavigate()
  const firebaseContext=useContext(FireBaseContext)

 if (!firebaseContext) {
    throw new Error("FireBaseContext is not provided!");
  }
  const {auth,firestore}=firebaseContext




  
  const handleSubmit=async (e:React.FormEvent )=>{
    e.preventDefault()
    console.log(firestore);

try {
  
  if(username.trim()=="")
    {
      return setErroName("Enter the Username")
    }else
    {
      setErroName("")
    }
    if(email.trim()=="")
    {
      return setErroEmail("Enter the Email")
    }else
    {
      setErroEmail("")
    }
    if(mobile.trim()=="" && mobile.length <=9  || mobile.length >10)
    {
     return setErroPhone("Enter the valid Phone number")
    }else
    {
      setErroPhone("")
    }
    const strongPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(password.trim()=="" ||!strongPasswordPattern.test(password) )
    {
     return setErroPass(`Password must be Strong..`)
    }else
    {
      setErroPass("")
    }



    
  const userCredential=createUserWithEmailAndPassword(auth,email,password)

  if((await userCredential).user)
  {
    
    await updateProfile((await userCredential).user,{displayName:username}) 
    await addDoc(collection(firestore,"users"),{
      id:(await userCredential).user.uid,
      username:username,
      phone:mobile
    

    })
    Navigate('/login')
  }
  
} catch (error) {
  if (error instanceof Error) {
    if (error.message === 'auth/weak-password') {
     
        toast.error('Password should be at least 6 characters')
        // alert('Password should be at least 6 characters');
      } else if (error.message === 'auth/email-already-in-use') {
        
        toast.error('Email is already in use')
      // alert('Email is already in use');
    } else if (error.message   === 'auth/invalid-email') {
      toast.error('Invalid email address');
    } else {
      toast.error('An error occurred: ' + error.message)
    }
  
    
  }
 
  
}

    
    
    

  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e)=>setUsername(e.target.value )}
          />
          <div className="error">{erroName}</div>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
           
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <div className="error">{erroEmail}</div>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
           
            name="phone"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
          />
          <div className="error">{erroPhone}</div>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
          
            name="password"
             value={password}
             onChange={(e)=>setPassowrd(e.target.value)}
          />
          <div className="error">{erroPass}</div>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>Navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
