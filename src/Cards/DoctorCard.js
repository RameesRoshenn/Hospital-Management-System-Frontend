import React, { useContext, useEffect, useState } from 'react'
import { allDoctorApi } from '../services/allAPI';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../services/baseurl';
import { Col, Row } from 'react-bootstrap';
import { addDoctorResponseContext } from '../Context/ContextShare';

function DoctorCard() {

  
  const {addDoctorResponse , setAddDoctorResponse} =useContext(addDoctorResponseContext)

  const [doctorCard , setDoctorCard] =useState([])

 const getAllDoctor =async ()=>{
  const result =await allDoctorApi()
  console.log(result);
  setDoctorCard(result.data)
 }

  useEffect(()=>{
    getAllDoctor()
  },[addDoctorResponse])


  return (
    <div>
    <div className='d-flex justify-content-center mt-5 pt-5'>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className='container-fluid'>
        {doctorCard?.length > 0 ? 
          doctorCard.map((item, index) => (
            <Col key={index} className='mb-4'>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" style={{ height: '200px' }} src={`${BASE_URL}/uploads/${item.doctorImage}`} />
                <Card.Body>
                  <Card.Title>{item.doctorname}</Card.Title>
                  <Card.Text>{item.department}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
          : <p>Null</p>
        }
      </Row>
    </div>
  </div>
  )
}

export default DoctorCard