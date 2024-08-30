import  { FormEvent, Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FireBaseContext } from '../../store/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import {User} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const[name,setName]=useState<string>()
  const[category,setCategory]=useState<string>()
  const[price ,setPrice]=useState<number>()
  const [image,setImage]=useState<File   | null>(null)
  
  const firebaseContext=useContext(FireBaseContext)
  const authContext=useContext(AuthContext)
  const Navigate=useNavigate()
  if (!firebaseContext) {
    throw new Error('firbaseContext is missing..')
    
  }
  if (!authContext) {

    throw new Error('firbaseContext is missing..')
    
  }
  const { user } = authContext as { user: User | null };
  const{firestore}=firebaseContext
  
if (user) {
  
  console.log("uid for user fire base ",user.uid);
}else
{
  console.log("user not fireBase inmm");

}
 
  
  const date=new Date()
  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault()
    if (!image) {
      console.error("No file selected for upload.");
      return;
    }
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }
    if (!user.uid) {
      console.error("User ID is undefined.");
      return;
    }
    const storageRef=ref(storage,`/image/${image?.name}`)

try {
  
  const upladingImg=await uploadBytes(storageRef,image)
  console.log("image upload success ",upladingImg);
  
  const downloadUrl=await getDownloadURL(storageRef)
  console.log('file available downloaded url',downloadUrl);
   await addDoc(collection(firestore,"products"),{
    name,
    category,
    price,
    url:downloadUrl,
    userId:user.uid,
    createdAt:date.toDateString()
   })
  
   Navigate('/')
} catch (error) {
  console.log("uploading error ",error);
  
  
}


  }


  return (
    <Fragment>
    <Header />
    <div className="centerDivWrapper">
      <div className="centerDiv">
      <form >
        
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" value={price} onChange={(e)=>setPrice(Number(e.target.value))} name="Price" />
          <br />
    
        <br />
        <img alt="Posts"  width="200px" height="200px" src={image ? URL.createObjectURL(image):"" } />
      
          <br />
          <input onChange={(e)=>{
            if (e.target.files && e.target.files.length>0) {
              setImage(e.target.files[0])
              
            }
          }} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
     
      </div>
    </div>
  </Fragment>
  
  );
};

export default Create;
