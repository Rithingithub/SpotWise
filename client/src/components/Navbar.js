import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../components/style.css";
import prjLogo from '../images/icon_car.png';
import  paymentLogo from './navimages/ic-outline-payment.png'
import history from './navimages/ic-round-history.png'
import support from  './navimages/simple-line-icons_support.png'
import settings from  './navimages/feather-settings.png'
import logout from   './navimages/ls-logout.png'


function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <div className='Header'>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
      <nav ref={navRef}>
        <a href="/payment"><img src={paymentLogo} alt="PaymentLogo" />Payment Methods</a>
        <a href="/history"><img src={history} alt="ParkingHistory" />Parking History</a>
        <a href="/support"><img src={support} alt="Support" />Support</a>
        <a href="/settings"><img src={settings} alt="settings" />Settings</a>
        <a href="/#"><img src={logout} alt="logout" />Logout</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
