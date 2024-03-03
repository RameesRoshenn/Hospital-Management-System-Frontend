import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { editDoctorResponseContext } from '../Context/ContextShare'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../services/baseurl';
import { editDoctorApi } from '../services/allAPI';

function EditDoctor({details}) {

    const {editDoctorResponse ,setEditDoctorResponse} =useContext(editDoctorResponseContext)

    const [show, setShow] = useState(false);

    const [preview,setPreview]=useState("")
    const [doctorDetails,setDoctorDetails]=useState({
        id:details._id,
        doctorname:details.doctorname,
        department:details.department,
        doctorImage:""

    })
    const handleClose = () =>{ setShow(false);
        handleClose1()
        }
          const handleShow = () => setShow(true);

          useEffect(()=>{
            if(doctorDetails.doctorImage){
                setPreview(URL.createObjectURL(doctorDetails.doctorImage));
        
            }
          },[doctorDetails.doctorImage])

          const handleClose1 =() =>{
            setDoctorDetails({
                doctorname:details.doctorname,
                department:details.department,
                doctorImage:""
            })
            setPreview("")
          }

          const handleUpdate =async()=>{
            const{id,doctorname,department,doctorImage}=doctorDetails
            if(!doctorname || !department ){
                toast.info('please fill  the form completely')

            }else{
                const reqBody =new FormData()
                    reqBody.append("doctorname",doctorname)
                    reqBody.append("department",department)
                    preview?reqBody.append("doctorImage",doctorImage):reqBody.append("doctorImage",doctorImage)

                    const token =sessionStorage.getItem("token")

                    if(preview){
                      const reqHeader ={
                        "Content-Type":"multipart/form-data",
                        "Authorization":`Bearer ${token}`
                  
                      }
const result =await editDoctorApi(id,reqBody,reqHeader)

if (result.status === 200){
    console.log(result.data);
    toast.success('updated successfully')
              handleClose()
              setEditDoctorResponse(result.data)
}
else {
    console.log(result.response.data);

}


                    }
                    else{
                        const reqHeader ={
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                      
                          }
                          const result =await editDoctorApi(id,reqBody,reqHeader)

if (result.status === 200){
    console.log(result.data);
    toast.success('updated successfully')
              handleClose()
              setEditDoctorResponse(result.data)
}
else {
    console.log(result.response.data);

}

                    }

                    
                
            }
          }



  return (
    <>     
           <button className="btn rounded-2  bg-success text-light  "  onClick={handleShow} >Edit</button>
           <Modal
  show={show}
  onHide={handleClose} 
  backdrop="static"
  keyboard={false}
  size='m'
  centered
  >
  <Modal.Header closeButton>
    <Modal.Title className='fw-bold d-flex justify-content-center  align-items-center text-light'> <i class="fa-solid fa-notes-medical me-2"></i>Edit Doctor Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className=' row '>
    <div className=' col-lg-6 '>
      <label>
        <input type="file" style={{display:'none'}}  onChange={(e)=>setDoctorDetails({...doctorDetails,doctorImage:e.target.files[0]})}  />
        <img className=' img-fluid '  src={preview?preview:`${BASE_URL}/uploads/${details.doctorImage}`} alt="no image"  />
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
    <Button variant="primary"  onClick={handleClose1}>
      Clear
    </Button>
    <Button variant="success"  onClick={handleUpdate} >Update</Button>
  </Modal.Footer>
  </Modal>
  <ToastContainer autoClose={2000} theme='colored ' position='top-center'/>
    </>
  )
}

export default EditDoctor