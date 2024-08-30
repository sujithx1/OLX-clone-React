

import { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostDetailContext } from '../../store/postContext';
import { FireBaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from '../Signup/UserTypes';
// import { Product } from '../Posts/PostType';
// import { User } from 'firebase/auth/web-extension';

function View() {
  const postDetalisContext=useContext(PostDetailContext)
  const firebaseContext=useContext(FireBaseContext)
  if (!postDetalisContext) {
    throw new Error('post Details contxt is missing...')
    
  }
  if (!firebaseContext) {
    throw new Error('firebase  contxt is missing...')
    
  }

  
  const [userDetails,setUserDetails]=useState< User| null>(null)
  const {postDetails}=postDetalisContext
  const {firestore}=firebaseContext
 
 useEffect(()=>{

  const fetchPostDetails=async () => {
    try {
      if (postDetails && postDetails.userId) {
        const userQuary=query(
          collection(firestore,'users'),
          where('id','==',postDetails.userId)
        )
        const quaryDetails=await getDocs(userQuary)
        if(!quaryDetails.empty)

          {
            quaryDetails.forEach((docs)=>{
              setUserDetails(docs.data() as User)
            })
          }
          else{
            console.log("no matching fond..");
            
          }
      }else{
        console.log("post details or user id is missing");
        
      }
      
    } catch (error) {
      console.log("fetching post details ",error);
      
      
    }
    
  }
  
  fetchPostDetails()


},[firestore,postDetails])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
