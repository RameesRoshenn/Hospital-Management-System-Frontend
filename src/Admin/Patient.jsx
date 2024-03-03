import React, { useContext, useEffect, useState } from 'react'


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PatientTable from '../Cards/PatientTable';
import { allPatientApi, patientAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addPatientResponseContext } from '../Context/ContextShare';




function Patient() {

  const {addPatientResponse , setAddPatientResponse} =useContext(addPatientResponseContext)



  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
  handleClear()
  }

  const handleShow = () => setShow(true);

  const handleClear =()=>{
    setPatientDetails({
      patientId:"",
    patientName:"",
    roomNo:""
  
    })
    
  }

  const [patientDetails,setPatientDetails]=useState({
    patientId:"",
    patientName:"",
    roomNo:""
  })

  console.log(patientDetails);

  const [token,setToken]=useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
 
  console.log(token);


  const handleAdd  =async(e)=>{
    e.preventDefault()
    const {patientId , patientName , roomNo} =patientDetails
    if(!patientId || !patientName  || !roomNo){
      toast.info('please fill  the form completely')
    }
    else{
  
  
        //1)create object for the class form Data
        const reqBody=new FormData()
         // 2)add value to the FormData - append()
      reqBody.append("patientId",patientId)
      reqBody.append("patientName",patientName)
      reqBody.append("roomNo",roomNo)
  
    if(token) { 
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
  
      }
  
      const result =await patientAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        toast.success('Patient Successfully Added.')
         handleClose()
         setAddPatientResponse(result.data)
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
      
      <div  >
          
              
  <div className='m-4 bg-light p-2 rounded-2  d-flex justify-content-between align-items-center '>
  
  <h3 className='ms-3' >Patients</h3>
  
      <button onClick={handleShow} className='btn btn-success rounded' >ADD PATIENT</button>
    
  
  </div>
  
  
  <Modal
  show={show}
  onHide={handleClose}
  backdrop="static"
  keyboard={false}
  centered
  >
  <Modal.Header closeButton>
    <Modal.Title><i class="fa-solid fa-suitcase-medical me-2"></i>Add Patient</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form className=' border  border-secondary p-3 rounded'>
  
  
    <Form.Group className="mb-3" controlId="formBasicEmail">
          
          <Form.Control type="text" value={patientDetails.patientId} onChange={(e)=>setPatientDetails({...patientDetails,patientId:e.target.value})} placeholder=" Id"  />
        </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicEmail">
          
          <Form.Control type="text" value={patientDetails.patientName} onChange={(e)=>setPatientDetails({...patientDetails,patientName:e.target.value})} placeholder=" Name"  />
        </Form.Group>
        
   
  
        <Form.Group className="mb-3" controlId="formBasicEmail">
          
          <Form.Control type="text" value={patientDetails.roomNo} onChange={(e)=>setPatientDetails({...patientDetails,roomNo:e.target.value})} placeholder="Room No" />
        </Form.Group>
    
    </form>
  
  </Modal.Body>
  <Modal.Footer>
  <Button variant="primary" onClick={handleClear}>
      Clear
    </Button>
    <Button variant="success" onClick={handleAdd} >Add</Button>
  </Modal.Footer>
  </Modal>
  
          
  <div>
    <PatientTable />
  </div>
          
      </div>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
  
  </>
  )
}

export default Patient