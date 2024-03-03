import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../images/abc-high-resolution-logo-transparent.png';
import Appointbg from '../images/Appoinmentbg.png';
import { allAppointmentApi, allDepartmentApi, allDoctorApi, appointementAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../Context/ContextShare';

function Appointment() {
  const [token, setToken] = useState('');

  const [appointmentDetails, setAppointmentDetails] = useState({
    fullname: '',
    phoneno: '',
    age: '',
    gender: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    } else {
      setToken('');
    }
  }, []);

  const handleClear = () => {
    setAppointmentDetails({
      fullname: '',
      phoneno: '',
      age: '',
      gender: '',
      department: '',
      doctor: '',
      date: '',
      time: '',
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { fullname, phoneno, age, gender, department, doctor, date, time } = appointmentDetails;
    if (!fullname || !phoneno || !age || !gender || !department || !doctor || !date || !time) {
      toast.info('Please fill the form completely');
    } else {
      const reqBody = new FormData();
      reqBody.append('fullname', fullname);
      reqBody.append('phoneno', phoneno);
      reqBody.append('age', age);
      reqBody.append('gender', gender);
      reqBody.append('department', department);
      reqBody.append('doctor', doctor);
      reqBody.append('date', date);
      reqBody.append('time', time);

      if (token) {
        const reqHeader = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        };

        try {
          const result = await appointementAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            toast.success('Appointment Successfully Booked.');
            handleClear();
          } else {
            console.log(result);
            toast.error(result.response.data);
          }
        } catch (error) {
          console.error(error);
          toast.error('An error occurred while booking the appointment.');
        }
      }
    }
  };

  const [departmentName, setDepartmentName] = useState([])
  const getDepartmentName = async () => {
    const result = await allDepartmentApi()
    console.log(result);
    setDepartmentName(result.data)
}

useEffect(() => {
  getDepartmentName()
}, [])



  const [doctorName , setDoctorName ] =useState([])
  const getDoctorName =async ()=>{
    const result =await allDoctorApi()
    console.log(result);
    setDoctorName(result.data)
   }

   useEffect(()=>{
    getDoctorName()
  },[])


  



  const {isAuthToken,setIsAuthToken} =useContext(isAuthTokenContext)
  const navigate =useNavigate()
  const handleLogout =()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    navigate('/')
  
  }

  return (
    <>
      <div style={{ backgroundImage: `linear-gradient(rgba(33, 11, 11, 0.7), rgba(0, 0, 0, 0.7)), url(${Appointbg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '730px' }}>
        <Container className="mx-2 mx-md-4 mx-lg-5 d-flex justify-content-between align-content-center">
          <Image className="mt-2" style={{ width: '80px'  }} src={Logo} alt="no image" />
          <div className="me-1 mt-4 pt-2">
            <Button onClick={handleLogout} className="btn btn-success rounded">LOGOUT</Button>
          </div>
        </Container>

<Container className="px-2 px-md-4 px-lg-5 mt-3 mt-md-2 d-flex flex-column justify-content-between align-items-center">
  {/* <div className="p-3 p-md-5 ms-2 ms-md-3">
    <div className="col-md d-flex flex-column align-items-start justify-content-start mt-5 ">
      <div className="headline text-light fw-bolder fs-1 ms-3 ms-md-5 mt-4 pt-2">Meet the Best Hospital</div>
      <p className="h text-light ms-3 ms-md-5 fs-6 pt-2">We know how large objects will act, <br /> but things on a small scale.</p>
      <div className="cta ms-3 ms-md-4">
        <Link to={`/`} className="btn btn-success rounded me-3 fw-bold ms-3 ms-md-5">Learn More</Link>
      </div>
    </div>
  </div> */}

  <div className="bg-light px-3 px-md-5 py-3 rounded" style={{ width: '100%', maxWidth: '450px', marginBottom: '200px' }}>
    <div>
      <div className="border-b border-gray-900/10 pb-4 pb-md-12 flex-wrap">
        <h2 className="text-dark fw-bolder d-flex justify-content-center">BOOK APPOINTMENT</h2>

        <Form className="mt-4 mt-md-8">
                  <Form.Group className="mb-3" controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" value={appointmentDetails.fullname} onChange={(e) => setAppointmentDetails({ ...appointmentDetails, fullname: e.target.value })} placeholder="Enter your full name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" value={appointmentDetails.phoneno} onChange={(e) => setAppointmentDetails({ ...appointmentDetails, phoneno: e.target.value })} placeholder="Enter your phone number" />
                  </Form.Group>

                  <div className='d-flex justify-content-between '>
  <Form.Group className="mb-3 col-lg-6 pe-2" controlId="formAge">
    <Form.Label>Age</Form.Label>
    <Form.Control type="text" value={appointmentDetails.age} onChange={(e) => setAppointmentDetails({ ...appointmentDetails, age: e.target.value })} placeholder="Enter your age" />
  </Form.Group>
  <Form.Group className="mb-3 col-lg-6" controlId="formGender">
    <Form.Label>Gender</Form.Label>
    <Form.Select value={appointmentDetails.gender} onChange={(e) => setAppointmentDetails({ ...appointmentDetails, gender: e.target.value })}>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </Form.Select>
  </Form.Group>
</div>





                 


                 <div className='d-flex justify-content-between '>
                    <Form.Group className="mb-3 col-lg-6 pe-2" controlId="formDepartment">
                      <Form.Label>Department</Form.Label>
                      <Form.Select value={appointmentDetails.department} onChange={(e) => setAppointmentDetails({ ...appointmentDetails, department: e.target.value })}>
                      {departmentName?.length>0?
                      departmentName?.map((item)=>(<option>{item.departmentName}</option>)):<option>Null</option>  }
                       
                      </Form.Select>
                    </Form.Group>
  
                    <Form.Group className="mb-3 col-lg-6" controlId="formDoctor">
                      <Form.Label>Doctor</Form.Label>
                      <Form.Select value={appointmentDetails.doctor} onChange={(e) => setAppointmentDetails({ ...appointmentDetails, doctor: e.target.value })}>
                      {doctorName?.length>0?
                      doctorName?.map((item)=>(<option>{item.doctorname}</option>)):<option>Null</option>  }
                        
                      </Form.Select>
                    </Form.Group>
                 </div>

                 <div className='d-flex justify-content-between '>
                    <Form.Group className="mb-3 col-lg-6 pe-2 " controlId="formDate">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" value={appointmentDetails.date} onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })} />
                    </Form.Group>
  
                    <Form.Group className="mb-3 col-lg-6" controlId="formTime">
                      <Form.Label>Time</Form.Label>
                      <Form.Select value={appointmentDetails.time} onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}>
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                      </Form.Select>
                    </Form.Group>
                 </div>

                  <div className="w-full  d-flex justify-content-between align-items-center ">
                    <Button className="me-3 ms-3" onClick={handleClear} variant="primary">
                      Clear
                    </Button>
                    <Button variant="success" onClick={handleAdd}>
                      Add
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default Appointment;
