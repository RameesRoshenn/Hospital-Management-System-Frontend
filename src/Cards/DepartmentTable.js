import React, { useContext, useEffect, useState } from 'react'
import { allDepartmentApi } from '../services/allAPI';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { addDepartmentResponseContext } from '../Context/ContextShare';

function DepartmentTable() {


const {addDepartmentResponse,setAddDepartmentResponse} =useContext(addDepartmentResponseContext)

  const [departmentData, setDepartmentData] = useState([])

  const getAllDepartment = async () => {
      const result = await allDepartmentApi()
      console.log(result);
      setDepartmentData(result.data)
  }

  useEffect(() => {
    getAllDepartment()
}, [addDepartmentResponse])


  return (
    <div className=' container '>
       <div className=' d-flex justify-content-center  align-items-center text-light  flex-wrap '>
   <Row xs={1} sm={2} md={3} lg={4} xl={4} >
            
            { departmentData?.length>0?
            departmentData?.map((item , index)=>(
             <Col key={index} className='mb-4'>
                <Card className='mx-2' style={{ width: '15rem' ,height:'300px'}}>
        <Card.Img variant="top" style={{height:'180px'}} src={item.logo} />
        <Card.Body>
          <Card.Title>{item.departmentName}</Card.Title>
          <Card.Text>
          {item.details}
          </Card.Text>
        </Card.Body>
      </Card>
               
             </Col>     ))
                : <p>null</p>  
                }
                 
                 
   </Row>
             
      </div>
    </div>
  )
}

export default DepartmentTable