

import { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FireBaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from './PostType';
import { PostDetailContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const postDetalisContext=useContext(PostDetailContext)

  const Navigate=useNavigate()
  const firebaseContext=useContext(FireBaseContext)
  if(!firebaseContext)
  {
    throw new Error('firbase context is missing')

  }
  if(!postDetalisContext)
  {
    throw new Error('post context is missing')

  }
  const{firestore}=firebaseContext
  const [products,setProducts]=useState<Product[]>([])
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
const {setPostDetails}=postDetalisContext
  useEffect(()=>{
  const fetchProducts=async ()=>{
    try {
      const quaryproducts=await getDocs(collection(firestore,'products'))
      const productList=quaryproducts.docs.map(doc=>({
        id:doc.id,
        ...(doc.data()as Omit<Product, 'id'>)
      })) 
      console.log(productList);
      
      setProducts(productList)
      
    } catch (error) {
      console.log("error from fetch products",error);
      setError('Failed to fetch products');
      
    }finally{
      setLoading(false);
    }
  }
  fetchProducts()
  },[firestore])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {loading?(
          <p>loading... </p>
        ) :error ?
        (
          <p>{error}</p>
        ):
        
        products.length ==0 ? 
       ( <p>No Products</p> ):(

        

        products.map((product)=>(

          <div
            className="card"
            onClick={()=>{
              setPostDetails(product)
               Navigate('/view')}}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer"> {product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
       )
        ))
          }
        </div>
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
       
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Posts;
