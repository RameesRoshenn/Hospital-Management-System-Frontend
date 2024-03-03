import React, { useEffect, useState } from 'react';
import Adheader from './Adheader';
import Adleftside from './Adleftside';
import { allAppointmentApi, allDoctorApi, allPatientApi } from '../services/allAPI';

import './Adhome.css'






function Adhome() {

  
  const [doctorLength , setDoctorLength ] =useState([])
  const getDoctorLength =async ()=>{
    const result =await allDoctorApi()
    console.log(result);
    setDoctorLength(result.data)
   }

  

  const [appointementLength,setAppointementLength]=useState([])
  const getAppointmentLength =async ()=>{
    const result =await allAppointmentApi()
    console.log(result);
    setAppointementLength(result.data)
   }


  const [patientLength,setPatientLength]=useState([])
  const getPatientLength =async ()=>{
    const result =await allPatientApi()
    console.log(result);
    setPatientLength(result.data)
   }

   useEffect(()=>{
    getPatientLength()
    getAppointmentLength()
    getDoctorLength()
  },[])




  return (
    <div >
      <Adheader />
      <Adleftside />

      <div className=' d-flex flex-wrap justify-content-center  ms-5 mt-5 pt-5  ps-5 status-cards-container  '>
       
      <div className="status-card  d-flex rounded-3  mt-3 overflow-hidden    "  style={{backgroundColor:'#4CAF50' , color: 'white'}}>
      <div className="icon-section p-3 d-flex  align-items-center  justify-content-center  fs-2 " style={{ backgroundColor: '#388E3C'}}>
      <i class="fa-solid fa-bed-pulse me-2"></i>
       
      </div>
      <div className="content-section ms-2 px-3 py-4 d-flex  flex-column  justify-content-center  align-items-center ">
        <div className="number fw-bolder fs-4">{patientLength.length}</div>
        <div className="label fs-5">PATIENT</div>
      </div>
    </div>

    <div className="status-card d-flex rounded-3  mt-3 overflow-hidden    " style={{backgroundColor:' #FF6666' , color: 'white'}}>
      <div className="icon-section p-3 d-flex  align-items-center  justify-content-center  fs-2 " style={{backgroundColor:'#FF0000'}}>
      <i class="fa-regular fa-calendar-check me-2"></i>
       
      </div>
      <div className="content-section ms-2 px-1 d-flex  flex-column  justify-content-center  align-items-center ">
        <div className="number fw-bolder fs-4">{appointementLength.length}</div>
        <div className="label fs-6">APPOINTMENTS</div>
      </div>
    </div>

    <div className="status-card d-flex rounded-3  mt-3 overflow-hidden    "  style={{backgroundColor:'#6699FF ' , color: 'white'}}>
      <div className="icon-section p-3 d-flex  align-items-center  justify-content-center  fs-2 " style={{backgroundColor:'#0000FF'}}  >
      <i class="fa-solid fa-notes-medical me-2"></i>
      </div>
      <div className="content-section ms-2 px-3 py-4 d-flex  flex-column  justify-content-center  align-items-center ">
        <div className="number fw-bolder  fs-4">{doctorLength.length}</div>
        <div className="label fs-5">DOCTORS</div>
      </div>
    </div>


      </div>








    </div>
  )

}


export default Adhome