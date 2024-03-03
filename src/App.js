
import { Routes ,Route } from 'react-router-dom';
import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import Adhome from './Admin/Adhome';
import Adlogin from './Admin/Adlogin';
import Auth from './component/Auth';
import Patient from './Admin/Patient';
import Doctor from './Admin/Doctor';
import Departments from './Admin/Departments';
import Adappoinment from './Admin/Adappoinment';
import Appointment from './Pages/Appointment';
import Dashboard from './Admin/Dashboard';
import DepartmentTable from './Cards/DepartmentTable';
import { useContext } from 'react';
import { isAuthTokenContext } from './Context/ContextShare';

function App() {

  
  const {isAuthToken,setIsAuthToken} =useContext(isAuthTokenContext)
  
  return (
    <div className="App">
      {/* HOSPITAL MANAGEMENT SYSTEM */}

    {/* <Header/> */}
      
      <Routes> <Route
          path="/"
          element={
            <>
              
              <Home />
              
            </>
          }
        />
       <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth register/>} />

      <Route path='/appointment' element={isAuthToken?<Appointment/>:<Home/>} />

     



      {/* admin */}
      <Route path='/adlogin' element={<Adlogin/>} />

      <Route path='/adhome' element={isAuthToken?<Adhome />:<Adlogin/>} />

      <Route path='/Doctor' element={<Doctor/>} />

      <Route path='/adappointment' element={<Adappoinment/>} />

      <Route path='/dashboard' element={<Dashboard/>} />


      <Route path='/department' element={<Departments/>} />

      <Route path='/departmentdetails' element={<DepartmentTable/>} />

      



      <Route path='/patient' element={<Patient/>} />







      </Routes>
      {/* <Footer/> */}
     
    </div>
  );
}

export default App;
