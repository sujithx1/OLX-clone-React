
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import LoginPage from './Pages/Login';

import { AuthContext, FireBaseContext } from './store/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import CreatePage from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import { Post } from './store/postContext';




function App() {
  // const context=
const authcontext=useContext(AuthContext)
if(!authcontext)
{
  throw new Error('Auth context is missing ')
}
const {setUser}=authcontext

const firebaseContext=useContext(FireBaseContext)
if (!firebaseContext) {
  throw new Error('FireBase context is missing ')
  
}
const{auth}=firebaseContext

useEffect(()=>{
  auth.onAuthStateChanged((user)=>{
if(user)
{
  setUser(user)

}
  })

  
})


  return (
    <div>
       <ToastContainer theme="dark"/>

       <Post>

      <Router>
        <Routes>
        <Route   path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/view' element={<ViewPost/>}/>
        </Routes>
     
      </Router>
       </Post>
    </div>
  );
}

export default App;
