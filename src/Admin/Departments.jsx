import React, { useContext, useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { departmentAPI } from '../services/allAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DepartmentTable from '../Cards/DepartmentTable';
import { addDepartmentResponseContext } from '../Context/ContextShare';

function Departments() {

 const {addDepartmentResponse,setAddDepartmentResponse}=useContext(addDepartmentResponseContext)
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
  handleClear()
  }
  const handleShow = () => setShow(true);

  const [departmentDetails,setDepartmentDetails]=useState({
    departmentName:"",
    logo:"",
    details:""
  })

  console.log(departmentDetails);

  const [token,setToken]=useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
 
  console.log(token);

      
const handleClear =()=>{
  setDepartmentDetails({
    departmentName:"",
    logo:"",
    details:""

  })
  
  
}


const handleAdd =async(e)=>{
  e.preventDefault()
  const {departmentName , logo , details} =departmentDetails
  if(!departmentName || !logo  || !details){
    toast.info('please fill  the form completely')
  }
  else{


      //1)create object for the class form Data
      const reqBody=new FormData()
       // 2)add value to the FormData - append()
    reqBody.append("departmentName",departmentName)
    reqBody.append("logo",logo)
    reqBody.append("details",details)

  if(token) { 
    const reqHeader ={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`

    }

    const result =await departmentAPI(reqBody,reqHeader)
    console.log(result);
    if(result.status==200){
      toast.success('Department Successfully Added.')
       handleClose()
       setAddDepartmentResponse(result.data)
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
        
  
  
  <div className='m-4 bg-light p-2 rounded-2  d-flex justify-content-between align-items-center flex-wrap'>
  
      <h3 className='ms-3' >Department</h3>
      
          <button onClick={handleShow} className='btn btn-success rounded' >ADD DEPARTMENT</button>
        
  
  </div>
  
  
  
  <Modal
  show={show}
  onHide={handleClose}
  backdrop="static"
  keyboard={false}
  centered
  >
  <Modal.Header closeButton>
    <Modal.Title><i class="fa-solid fa-suitcase-medical me-2"></i>Add Departments</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form className=' border  border-secondary p-3 rounded'>
  
  
    <Form.Group className="mb-3" controlId="formBasicEmail">
          
          <Form.Control type="text" value={departmentDetails.departmentName} onChange={(e)=>setDepartmentDetails({...departmentDetails,departmentName:e.target.value})} placeholder="Department Name"  />
        </Form.Group>
        
    <Form.Group className="mb-3" controlId="formBasicEmail">
          
          <Form.Control type="text" value={departmentDetails.logo} onChange={(e)=>setDepartmentDetails({...departmentDetails,logo:e.target.value})}  placeholder="Logo Link" />
        </Form.Group>
        
  
        <Form.Group className="mb-3" controlId="formBasicEmail">
          
          <Form.Control type="text" value={departmentDetails.details} onChange={(e)=>setDepartmentDetails({...departmentDetails,details:e.target.value})}  placeholder="Details" />
        </Form.Group>
    
    </form>
  
  </Modal.Body>
  <Modal.Footer>
  <Button variant="primary" onClick={handleClear}>
      Clear
    </Button>
    <Button variant="success" onClick={handleAdd}  >Add</Button>
  </Modal.Footer>
  </Modal>
  
  
  
       <DepartmentTable/>
       
   
      </div>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
  
  </>
  );
}

export default Departments;
