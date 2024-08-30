

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useContext } from 'react';
import { AuthContext, FireBaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

function Header() {
  const firebaseContext=useContext(FireBaseContext)

  const authContext=useContext(AuthContext)
  if (!authContext) {
    throw new Error('Auth Context Missing ..')
    
  }
  if(!firebaseContext)
  {
    throw new Error('fireBase Context missing..')

  }

  const{user}=authContext
  const{auth}=firebaseContext
  const Navigate=useNavigate()



  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          
          <span>{user? "Welcome "+user.displayName :<>
            <span style={{cursor:'pointer'}} onClick={()=>{Navigate('/login')}}>Login</span>
          </>}</span>


          <hr />
        </div>
        <div className="logoutpage">

         {  user && <span  onClick={()=>{
            console.log("logout clicked");
            auth.signOut().then(()=>console.log("logout success")
            )
            
            Navigate('/login')

          }}>Logout</span>}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{Navigate('/create')
            console.log("sellbutton ");
            }}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
