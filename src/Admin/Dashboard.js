import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { allAppointmentApi, allDoctorApi, allPatientApi, deleteDoctorApi, deletePatientApi } from '../services/allAPI'
import { addDoctorResponseContext, addPatientResponseContext, editDoctorResponseContext } from '../Context/ContextShare'
import EditDoctor from './EditDoctor'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../services/baseurl'





function Dashboard() {

  const {addDoctorResponse , setAddDoctorResponse} =useContext(addDoctorResponseContext)
  const {addPatientResponse , setAddPatientResponse} =useContext(addPatientResponseContext)
  const {editDoctorResponse ,setEditDoctorResponse} =useContext(editDoctorResponseContext)


const [doctorDetails ,setDoctorDetails] =useState([])

const getDoctordetails =async()=>{
  const token = sessionStorage.getItem("token")

  const reqHeader ={
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`

  }
  const result =await allDoctorApi(reqHeader)
  console.log(result.data)
  setDoctorDetails(result.data)
}

useEffect(()=>{
  getDoctordetails()
},[addDoctorResponse,editDoctorResponse])

const [patientDetails , setPatientDetails]=useState([])

const getPatientDetails=async()=>{
  const token = sessionStorage.getItem("token")

  const reqHeader ={
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`

  }
  const result =await allPatientApi(reqHeader)
  console.log(result.data)
  setPatientDetails(result.data)
}

useEffect(()=>{
  getPatientDetails()
},[addPatientResponse])

const handleDeleteDoctor =async (id)=>{
  const token =sessionStorage.getItem("token")
  const reqHeader ={
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`

  }
  const result =await deleteDoctorApi(id,reqHeader)
  console.log(result);
  if(result.status === 200){
      getDoctordetails()
      toast.success("successfully deleted")
  }else{
      toast.error(result.response.data)
  }
}

const handleDeletePatient =async (id)=>{
  const token =sessionStorage.getItem("token")
  const reqHeader ={
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`

  }
  const result =await deletePatientApi(id,reqHeader)
  console.log(result);
  if(result.status === 200){
      getPatientDetails()
      toast.success("successfully deleted")
  }else{
      toast.error(result.response.data)
  }
}



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
    <div className=''>
    <div className='m-4 bg-light p-2 rounded-2 d-flex align-items-center justify-content-center '>
      <h3 className='ms-3 fw-bolder text-dark fs-1 pt-1'>
        <i className="fa-solid fa-hospital-user me-2"></i>Dashboard
      </h3>
    </div>

    <div className='d-flex justify-content-center flex-wrap  main-div '>
       <div className="status-card  d-flex rounded-3  mt-3       me-5"  style={{backgroundColor:'#4CAF50' , color: 'white'}}>
       <div className="icon-section p-3 d-flex  align-items-center  justify-content-center  fs-2 " style={{ backgroundColor: '#388E3C'}}>
       <i class="fa-solid fa-bed-pulse me-2"></i>
        
       </div>
       <div className="content-section ms-2 px-3 py-4 d-flex d-flex  flex-column  justify-content-center  align-items-center  ">
         <div className="number fw-bolder fs-4">{patientLength.length}</div>
         <div className="label fs-5">PATIENT</div>
       </div>
     </div>
 
     <div className="status-card d-flex rounded-3  mt-3 overflow-hidden    me-5" style={{backgroundColor:' #FF6666' , color: 'white'}}>
       <div className="icon-section p-3 d-flex  align-items-center  justify-content-center  fs-2 " style={{backgroundColor:'#FF0000'}}>
       <i class="fa-regular fa-calendar-check me-2"></i>
        
       </div>
       <div className="content-section ms-2 px-1 d-flex  flex-column  justify-content-center  align-items-center ">
         <div className="number fw-bolder fs-4">{appointementLength.length}</div>
         <div className="label fs-6">APPOINTMENTS</div>
       </div>
     </div>
 
     <div className="status-card d-flex rounded-3  mt-3 overflow-hidden  me-5  "  style={{backgroundColor:'#6699FF ' , color: 'white'}}>
       <div className="icon-section p-3 d-flex  align-items-center  justify-content-center  fs-2 " style={{backgroundColor:'#0000FF'}}  >
       <i class="fa-solid fa-notes-medical me-2"></i>
       </div>
       <div className="content-section ms-2 px-3 py-4 d-flex  flex-column  justify-content-center  align-items-center ">
         <div className="number fw-bolder  fs-4">{doctorLength.length}</div>
         <div className="label fs-5">DOCTORS</div>
       </div>
     </div>
 
 
       </div>

     

<div className='d-flex flex-wrap justify-content-between mx-2 mx-lg-5'>
          <Row className='col-12 col-md-6 col-lg-4 mt-5'>
            <div className='mt-2 border rounded-2 '>
              <div className='border d-flex align-items-center rounded py-3 px-1  m-3'>
                <h4 className='fw-bolder'>Doctor Details</h4>
                <div className='ms-0 d-flex'>
                  <button className='btn'></button>
                  <button className='btn'></button>
                </div>
              </div>

              {doctorDetails?.length > 0 ? (
                doctorDetails.map((item) => (
                  <div className='border d-flex align-items-center rounded p-3 m-3'>
                    <img
                      src={`${BASE_URL}/uploads/${item.doctorImage}`}
                      className='rounded-circle me-3'
                      style={{ width: '80px' }}
                      alt={`Doctor ${item.doctorname}`}
                    />
                    <h5>{item.doctorname}</h5>
                    <div className='ms-auto d-flex'>
                      <EditDoctor details={item} />
                      <button
                        onClick={() => handleDeleteDoctor(item._id)}
                        className='btn'
                      >
                        <i className='fa-solid fa-trash text-danger'></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-danger fw-bolder fs-4'>
                  No Doctor uploaded yet !!
                </p>
              )}
            </div>
          </Row>



          

          <Row className='col-lg-4'>
            <div className='mt-5 border rounded-2'>
              <div className='border d-flex align-items-center rounded p-1 m-2'>
                <h5 className='me-3'>#</h5>
                <h5>Name</h5>
                <h6 className='ms-3'>Room No</h6>
                <div className='ms-auto d-flex'>
                  <button className='btn'></button>
                </div>
              </div>

              {patientDetails?.length > 0 ? (
                patientDetails.map((item, index) => (
                  <div className='border d-flex align-items-center rounded p-3 m-3'>
                    <h5 className='me-3'>{index + 1}</h5>
                    <h5>{item.patientName}</h5>
                    <h6 className='ms-3'>{item.roomNo}</h6>
                    <div className='ms-auto d-flex'>
                      <button
                        onClick={() => handleDeletePatient(item._id)}
                        className='btn'
                      >
                        <i className='fa-solid fa-trash text-danger'></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-danger fw-bolder fs-4'>
                  No Doctor uploaded yet !!
                </p>
              )}
            </div>
          </Row>
        </div>

       <ToastContainer autoClose={2000} theme='colored ' position='top-center'/>
    </div>
  )
}

export default Dashboard