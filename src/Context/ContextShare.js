import React, { createContext, useState } from 'react'


export const addDoctorResponseContext = createContext()
export const addDepartmentResponseContext =createContext()

export const addPatientResponseContext =createContext()
export const editDoctorResponseContext =createContext()
export const isAuthTokenContext = createContext()

function ContextShare({children}) {

    const [addDoctorResponse , setAddDoctorResponse] =useState({})
    const [addDepartmentResponse , setAddDepartmentResponse]= useState({})
    const [addPatientResponse , setAddPatientResponse]=useState({})
    const [editDoctorResponse ,setEditDoctorResponse]=useState({})
    const [isAuthToken, setIsAuthToken] = useState(true)

  return (
   

    <>
    <addDoctorResponseContext.Provider value={{addDoctorResponse,setAddDoctorResponse}}>
   <addDepartmentResponseContext.Provider value={{addDepartmentResponse,setAddDepartmentResponse}}> 
 <addPatientResponseContext.Provider value={{addPatientResponse,setAddPatientResponse}}>
      <editDoctorResponseContext.Provider value={{editDoctorResponse ,setEditDoctorResponse}}>
        <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>
           
           {children}
           
        </isAuthTokenContext.Provider>
      </editDoctorResponseContext.Provider>
 </addPatientResponseContext.Provider>
   </addDepartmentResponseContext.Provider>
    </addDoctorResponseContext.Provider>
    </>
   
  )
}

export default ContextShare