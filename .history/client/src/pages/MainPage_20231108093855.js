
import React from 'react'
import prjLogo from '../images/icon_car.png';
import '../App.css';
import Navbar from '../components/Navbar';


const MainPage = () => {
  return (
   <div>
     
      <div className='Navbar'>
      <React.Fragment>
			<Navbar/>
		  </React.Fragment>
      </div>
      <div>
        <h1 style={color:red;}>hello</h1>
      </div>
    </div>
  )
}

export default MainPage
