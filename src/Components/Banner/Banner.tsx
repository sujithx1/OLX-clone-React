

import './Banner.css';
import Arrow from '../../assets/Arrow'
import { useContext, useEffect, useState } from 'react';
import { FireBaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../Posts/PostType';
function Banner() {

  const firebaseContext=useContext(FireBaseContext)
  if(!firebaseContext)
  {
    throw new Error('fireBase Context is Missing..')

  }
  const {firestore}=firebaseContext

const [products,setProducts]=useState<Product[]| null>(null)
  useEffect(()=>{
    const fetchProduct=async () => {
      try {

        const quaryproducts=await getDocs(collection(firestore,'products'))
        const productList=quaryproducts.docs.map((doc)=>({
          id:doc.id,
          ...(doc.data()as Omit < Product,'id'>)
        }))
        console.log(productList);

        setProducts(productList)
        
      } catch (error) {
        
        console.log("eroor for fetching productss ",error);
        
      }
      
    }
    fetchProduct()
  },[firestore])
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            {
              products?.map((product)=>(

                <span>{product.category}</span>
              ))
            }
            {/* <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span> */}
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
