import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {allDoctorApi ,doctorAPI } from '../services/allAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import DoctorCard from '../Cards/DoctorCard';
import { addDoctorResponseContext } from '../Context/ContextShare';

function Doctor() {

  const {addDoctorResponse , setAddDoctorResponse} =useContext(addDoctorResponseContext)
  
  const [show, setShow] = useState(false);

  const [doctorDetails,setDoctorDetails]=useState({
    doctorname:"",
    department:"",
    doctorImage:""
  })
  
//to hold the url of image
const [preview,setPreview]=useState()

  console.log(doctorDetails);

  
  useEffect(() => {
    if (doctorDetails.doctorImage) {
    
      //javascript predefined method- url - createObjectUrl -files will be converted into url 
      setPreview(URL.createObjectURL(doctorDetails.doctorImage));
    }
  }, [doctorDetails.doctorImage]);

  const [token,setToken]=useState("")

  


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
  console.log('preview',preview);
  console.log(token);
  


  
  
 

  const handleClose = () => {setShow(false);
  handleClear()
  }

   
  
    const handleShow = () => setShow(true);

    
const handleClear =()=>{
  setDoctorDetails({
    doctorname:"",
    department:"",
    doctorImage:""

  })
  setPreview("")
}

const handleAdd =async(e)=>{
  e.preventDefault()
  const {doctorname,department,doctorImage} =doctorDetails
  if(!doctorname || !department  || !doctorImage){
    toast.info('please fill  the form completely')
  }
  else{


      //1)create object for the class form Data
      const reqBody=new FormData()
       // 2)add value to the FormData - append()
    reqBody.append("doctorname",doctorname)
    reqBody.append("department",department)
    reqBody.append("doctorImage",doctorImage)

  if(token) { 
    const reqHeader ={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`

    }

    const result =await doctorAPI(reqBody,reqHeader)
    console.log(result);
    if(result.status==200){
      toast.success('Doctor Successfully Added.')
       handleClose()
       setAddDoctorResponse(result.data)
    }
    else{
      console.log(result);
      toast.error(result.response.data)
    }
  }

}
}




  return (
   <>
      <div>
  
  
         
                  
  <div className='m-4 bg-light p-2 rounded-2  d-flex justify-content-between align-items-center '>
  
  <h3 className='ms-3' >Doctors</h3>
  
      <button onClick={handleShow} className='btn btn-success rounded' > ADD DOCTOR</button>
    
  
  </div>
  
      
  <Modal
  show={show}
  onHide={handleClose} 
  backdrop="static"
  keyboard={false}
  size='m'
  centered
  >
  <Modal.Header closeButton>
    <Modal.Title className='fw-bold d-flex justify-content-center  align-items-center text-light'> <i class="fa-solid fa-notes-medical me-2"></i> Doctor Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className=' row '>
    <div className=' col-lg-6 '>
      <label>
        <input type="file" style={{display:'none'}}  onChange={(e)=>setDoctorDetails({...doctorDetails,doctorImage:e.target.files[0]})}  />
        <img className=' img-fluid '  src={preview?preview:"https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image"  />
      </label>
      
      </div>
     <div className=' col-lg-6 justify-content-center  align-items-center  flex-column  '>
        <form className='pt-4'>
      
  
        <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
              
              <Form.Control type="text" placeholder="Doctor Name" value={doctorDetails.doctorname} onChange={(e)=>setDoctorDetails({...doctorDetails,doctorname:e.target.value})} />
            </Form.Group>
      
        <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
              
              <Form.Control type="text" placeholder="Department" value={doctorDetails.department} onChange={(e)=>setDoctorDetails({...doctorDetails,department:e.target.value})} />
            </Form.Group>
            
      
            
       
        </form>
  </div>
   </div>
  
  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary"  onClick={handleClear}>
      Clear
    </Button>
    <Button variant="success" onClick={handleAdd} >Add</Button>
  </Modal.Footer>
  </Modal>
      
            
       <DoctorCard/>
      
        
        <Link style={{ textDecoration: 'none', color: 'white' }} to={'/adhome'} ><i class="fa-solid fa-arrow-right fa-rotate-100 me-2"></i>Back to Home</Link>
         
          
      </div>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
   </>
  )
}

export default Doctor