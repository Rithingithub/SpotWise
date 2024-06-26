import { useRef } from "react";
import { FaBars, FaTimes  } from "react-icons/fa";
import css_styles from "../components/style.module.css";
import prjLogo from '../images/icon_car.png';
import  paymentLogo from './navimages/ic-outline-payment.png'
import history from './navimages/ic-round-history.png'
import support from  './navimages/simple-line-icons_support.png'
import settingsLogo from  './navimages/feather-settings.png' // Rename the import to avoid conflicts
import logout from   './navimages/ls-logout.png'

import Session from "supertokens-web-js/recipe/session";
import { useNavigate } from "react-router-dom";



function Navbar() {
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle(css_styles.responsive_nav);
  };
  
  async function handleLogout () {
    await Session.signOut(); 
    navigate ("/#");
  };


  return (
    <header>
      <div className={css_styles['Header']}>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
      <nav ref={navRef}>
        <a href="/PaymentTiles"><img src={paymentLogo} alt="PaymentLogo" />Payment Methods</a>
        <a href="/history"><img src={history} alt="ParkingHistory" />Parking History</a>
        <a href="/support"><img src={support} alt="Support" />Support</a>
        <a href="/settings"><img src={settingsLogo} alt="settingsLogo" />Settings</a>
        <a href="/auth" onClick={handleLogout}><img src={logout} alt="logout" />Logout</a>
       

        <button className={`${css_styles["nav-btn"]} ${css_styles["nav-close-btn"]}`} onClick={showNavbar}>
  


        
          <FaTimes />
        </button>
      </nav>
      <button className={css_styles["nav-btn"]} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
