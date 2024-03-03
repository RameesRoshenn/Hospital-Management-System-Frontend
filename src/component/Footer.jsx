import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
        <div style={{width:'100%' , height:'300px' }} className='d-flex justify-content-center align-w-100 flex-column  bg-light'>
            <div className="footer d-flex align-items-center justify-content-evenly w-100 ">
              
                 <div className='products d-flex flex-column'>
                    <h3  className='text-dark'>Hospital Link</h3>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Home</Link>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>About Us</Link>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Management Team</Link>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Services</Link>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Content Us</Link>
    
                    
                 </div>
                 <div className='links d-flex flex-column'>
                    <h3  className='text-dark'>Information Link</h3>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Medical Team</Link>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Patient Care</Link>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Diagnostic Services</Link>
                    
                 </div>
                 <div className='links d-flex flex-column'>
                    <h3  className='text-dark'>Extra Link</h3>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Online Appointment</Link>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Find a Doctor</Link>
                    <Link to={''} style={{textDecoration:'none',color:'black'}}>Gallery</Link>
                    
                 </div>
    
                 
    
    {/* 
                 <div className="contacts ">
          <h4 className='mb-3 text-light '>contacts us</h4>
         
    
          <div className='d-flex justify-content-evenly align-items-center'>
          <Link to={'https://bootswatch.com'}style={{textDecoration:'none',color:'black'}}><i
          class="fa-brands fa-instagram fa-2x"></i></Link>
    
          <Link to={'https://bootswatch.com'}style={{textDecoration:'none',color:'black'}}><i
          class="fa-brands fa-twitter fa-2x"></i></Link>
    
          <Link to={'https://bootswatch.com'}style={{textDecoration:'none',color:'black'}}><i
          class="fa-brands fa-linkedin fa-2x"></i></Link>
    
          <Link to={'https://bootswatch.com'}style={{textDecoration:'none',color:'black'}}><i
          class="fa-brands fa-facebook fa-2x"></i></Link>
    
    
          </div>
         </div> */}
    
                
                </div>
                <p className=' mt-5  text-align-center justify-content-center d-flex text-dark '>Copyright © 2023 Project fair . Built with React. </p>
              
                 </div>
    </>
  )
}

export default Footer