

import React, { useState ,useContext} from 'react';
import { FireBaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth/web-extension';





function Login() {
  const [email,setEmail]=useState<string>("")
  const [password,setPasword]=useState<string>("")
  const [erroEmail,setErroEmail]=useState<string>("")
  const [erroPass,setErroPass]=useState<string>("")
  const Navigate=useNavigate()

  const isFirebaseError = (error: unknown): error is { code: string; message: string } => {
    console.log(error); // Log the error to check its structure
    return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
  };
  const firebaseContext=useContext(FireBaseContext)
  if (!firebaseContext) {
    throw new Error('fireBase context is not defined')
    
  } 
   const {auth}=firebaseContext

  const handleLogin= async(e:React.FormEvent)=>{

    e.preventDefault()

try {
  if(email.trim()=="")
  {
   return setErroEmail("Enter valid Email")
  }else
  {
    setErroEmail("")
    
  }
  if(password.trim()=="")
  {
    return setErroPass("Enter password")
  }else
  {
    setErroPass("")
    
  }


 await signInWithEmailAndPassword(auth,email,password)
 toast.success('Logged in successfully');
 Navigate('/');
} catch (error : unknown) {
  if (isFirebaseError(error)) {
     console.log(error.code)
    
    switch (error.code) {
      case 'auth/invalid-password':
        toast.error('Incorrect password. Please try again.');
        break;
      case 'auth/user-not-found':
        toast.error('No user found with this email.');
        break;
      case 'auth/invalid-email':
        toast.error('Invalid email address.');
        break;
      default:
        toast.error('An error occurred: ' + error.message); // Generic error message
        // console.log(error.message);
        
        break;
    } 
  }
  else {
    // Handle the case where error is not an instance of Error
    toast.error('An unexpected error occurred.');
  }
  
}
    
  }




  return (


    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
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
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
             value={password}
             onChange={(e)=>setPasword(e.target.value)}
            name="password"
         
          />
          <div className="error">{erroPass}</div>
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>Navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
