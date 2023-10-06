import { useRef } from "react";
import { FaBars, FaTimes  } from "react-icons/fa";
import "../components/style.css";
import prjLogo from '../images/icon_car.png';
import  paymentLogo from './navimages/ic-outline-payment.png'
import history from './navimages/ic-round-history.png'
import support from  './navimages/simple-line-icons_support.png'
import settingsLogo from  './navimages/feather-settings.png' // Rename the import to avoid conflicts
import logout from   './navimages/ls-logout.png'
import PaymentTiles from './PaymentTiles'; // Import the PaymentTiles component
import Settings from './Settings'; // Rename the import to match the component name
import History from './History'
import Support from './Support'


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
        <a href="/PaymentTiles"><img src={paymentLogo} alt="PaymentLogo" />Payment Methods</a>
        <a href="/History"><img src={history} alt="ParkingHistory" />Parking History</a>
        <a href="/Support"><img src={support} alt="Support" />Support</a>
        <a href="/Settings"><img src={settingsLogo} alt="settingsLogo" />Settings</a>
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
