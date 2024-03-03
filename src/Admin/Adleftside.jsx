


import React from 'react';
import { Link } from 'react-router-dom';

function Adleftside() {
  return (
    <div className='col-lg-3 col-md-4 col-sm-6 h-100 position-fixed mt-0 border bg-light p-3'>
      <div className='d-flex flex-column justify-content-start ms-3'>
        <div className='mt-4 btn btn-outline-dark text-start fs-6 border text-center '>
          <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-hospital-user me-2"></i>Dashbroad
          </Link>
        </div>
        <div to={'/patient'}className='mt-2 btn btn-outline-dark text-start fs-6  border text-center '><Link to={'/patient'} style={{textDecoration:'none'}}><i class="fa-solid fa-bed-pulse me-2"></i> Add Patients</Link></div>
         
    
         <div className='mt-2 btn btn-outline-dark text-start fs-6  border text-center '><Link to={'/department'} style={{textDecoration:'none'}}><i class="fa-solid fa-suitcase-medical me-2"></i>Add New Department</Link></div>
     
          <div className='mt-2 btn btn-outline-dark text-start fs-6  border text-center '><Link to={'/Doctor'} style={{textDecoration:'none'}}><i class="fa-solid fa-notes-medical me-2"></i> Add New Doctors</Link></div>
          <div className='mt-2 btn btn-outline-dark text-start fs-6  border text-center '><Link to={'/adappointment'} style={{textDecoration:'none'}}><i class="fa-regular fa-calendar-check"></i> Appoinment Details</Link></div>
      
      </div>
    </div>
  )
}

export default Adleftside;


