import React, { useContext } from 'react'

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import KeyIcon from '@mui/icons-material/Key';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import Logo from '../images/abc-high-resolution-logo-white-transparent.png'
import { Link,useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { isAuthTokenContext } from '../Context/ContextShare';

function Auth({ register }) {

  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
 

  const [userData, setUserData] = useState({
    username: "",
    phoneno: "",
    password: ""
  })
  console.log(userData);

  const navigate = useNavigate()

  const registerForm = register ? true : false

  const [showPassword, setShowPassword] = useState(false);

  const divStyle = {
    width: '400px',
    // height: '490px',
    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent('<svg id="visual" viewBox="0 0 400 400" width="400" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="400" height="400" fill="#1b2327"></rect><path d="M0 293L5.2 298.8C10.3 304.7 20.7 316.3 31 317.7C41.3 319 51.7 310 61.8 310.2C72 310.3 82 319.7 92.2 327.7C102.3 335.7 112.7 342.3 123 335.8C133.3 329.3 143.7 309.7 154 300.2C164.3 290.7 174.7 291.3 184.8 292.8C195 294.3 205 296.7 215.2 304C225.3 311.3 235.7 323.7 246 330.3C256.3 337 266.7 338 277 331.5C287.3 325 297.7 311 307.8 308.3C318 305.7 328 314.3 338.2 316.7C348.3 319 358.7 315 369 309.2C379.3 303.3 389.7 295.7 394.8 291.8L400 288L400 401L394.8 401C389.7 401 379.3 401 369 401C358.7 401 348.3 401 338.2 401C328 401 318 401 307.8 401C297.7 401 287.3 401 277 401C266.7 401 256.3 401 246 401C235.7 401 225.3 401 215.2 401C205 401 195 401 184.8 401C174.7 401 164.3 401 154 401C143.7 401 133.3 401 123 401C112.7 401 102.3 401 92.2 401C82 401 72 401 61.8 401C51.7 401 41.3 401 31 401C20.7 401 10.3 401 5.2 401L0 401Z" fill="#4285eb" stroke-linecap="round" stroke-linejoin="miter"></path></svg>')}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };


  //register function

  const handleRegister = async (e) => {
    e.preventDefault()

    const { username, phoneno, password } = userData

    if (!username || !phoneno || !password) {
      toast.info('Please fill the form completely')
    }
    else {
      const result = await registerAPI(userData)
      /* console.log(result.data);*/
      if (result.status === 200) {
        toast.success(`${result.data.username} is successfully registerd`)
        setUserData({
          username: "",
          phoneno: "",
          password: ""
        })

        navigate('/login')
      }
      else {
        toast.error(result.response.data)
      }

    }
  }

  //login function

  const handleLogin = async (e) =>{
    e.preventDefault()

    //desturcture
      const {phoneno,password}=userData
      if(!phoneno || !password){
        toast.info("Please fill the form")
      }
      else{
        const result=await loginAPI(userData)
        console.log(result);
        
        if(result.status===200){
          toast.success('Login Successfull')
          
          sessionStorage.setItem("existing user",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthToken(true)
          setUserData({
            username: "",
            phoneno: "",
            password: ""
          })


          //navigate to appointment page
          setTimeout(()=>{
 navigate('/appointment')
          },1500)
          

        }
        else{
          toast.error(result.response.data)
        }

      }
    
  }

  return (

<>
  
      <div>
        <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'} ><i class="fa-solid fa-arrow-right fa-rotate-100 me-2"></i>Back to Home</Link>
  
        <div className='d-flex justify-content-center align-items-center   mt-5 pt-5'  >
  
          <div style={divStyle} className=' ps-5 pe-5 pt-3 pb-5 mb-5 mt-3 rounded bg-light d-flex  flex-column  align-items-center    justify-content-center  h-100  '>
            <img className=' ' style={{ width: '80px' }} src={Logo} alt="no image" />
  
  
            {
              registerForm ? <><h3 className=' fw-bolder pt-2' style={{ color: 'white' }}>REGISTER</h3>
  
  
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ color: '#ADD8E6', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" label="Username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} variant="standard" style={{ width: '230px' }} InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }}>
  
  
                  <ContactPhoneIcon sx={{ color: '#ADD8E6', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" label="Phone Number" value={userData.phoneno} onChange={(e) => setUserData({ ...userData, phoneno: e.target.value })} variant="standard" style={{ width: '230px' }} InputLabelProps={{ style: { color: 'white' } }} InputProps={{ inputMode: 'tel', style: { color: 'white' } }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }}>
                  <KeyIcon sx={{ color: '#ADD8E6', mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Password"
                    value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      style: { color: 'white' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: '230px' }}
                    InputLabelProps={{ style: { color: 'white' } }} />
                </Box><button className='btn btn-success rounded mt-5' onClick={handleRegister}>Register</button><p style={{ color: 'white', paddingTop: '20px' }}>Already a User? Click here to <Link to={'/login'} className='text-success fw-bolder '>Login</Link></p></> :
  
  
                <>
                  <h3 className=' fw-bolder pt-2' style={{ color: 'white' }}> LOGIN</h3>
  
  
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ContactPhoneIcon sx={{ color: '#ADD8E6', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Phone Number" value={userData.phoneno} onChange={(e) => setUserData({ ...userData, phoneno: e.target.value })} variant="standard" style={{ width: '230px' }} InputLabelProps={{ style: { color: 'white' } }} InputProps={{ inputMode: 'tel', style: { color: 'white' } }} />
                  </Box>
  
  
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }}>
                  <KeyIcon sx={{ color: '#ADD8E6', mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Password"
                    value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      style: { color: 'white' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: '230px' }}
                    InputLabelProps={{ style: { color: 'white' } }} />
                </Box>
  
  
                  <button className='btn btn-success rounded mt-5' onClick={handleLogin}>Login</button>
  
                  <p style={{ color: 'white', paddingTop: '20px' }}>New User? Click here to <Link to={'/register'} className='text-success fw-bold '>Register</Link></p>
  
  
  
                </>
            }
  
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
</>
  )
}

export default Auth