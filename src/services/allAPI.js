import { common } from "@mui/material/colors"
import { BASE_URL } from "./baseurl"
import { commonApi } from "./commonAPI"



//register api
export const registerAPI =async(user)=>{
    return await commonApi("POST",`${BASE_URL}/user/register`,user,"")
}


//login api
export const loginAPI =async(user)=>{
    return await commonApi("POST",`${BASE_URL}/user/login`,user,"")
}

//admin api

export const adminAPI =async(admin)=>{
    return await commonApi("POST",`${BASE_URL}/admin/login`,admin,"")
}



//appointment api
export const appointementAPI =async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${BASE_URL}/appointment/add`,reqBody,reqHeader)
}


//doctor api
export const doctorAPI =async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${BASE_URL}/doctor/add`,reqBody,reqHeader)
}



//department api

export const departmentAPI =async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${BASE_URL}/departments/add`,reqBody,reqHeader)
}

//patient api

export const patientAPI =async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${BASE_URL}/patients/add`,reqBody,reqHeader)
}

// get all appointment


export const allAppointmentApi =async(reqHeader)=>{
    return await commonApi("GET",`${BASE_URL}/appointments/all-appointment`,"",reqHeader)
}

//get doctor card


export const allDoctorApi =async(reqHeader)=>{
    return await commonApi("GET",`${BASE_URL}/doctors/all-doctors`,"",reqHeader)
}


//get patient card


export const allPatientApi =async(reqHeader)=>{
    return await commonApi("GET",`${BASE_URL}/patients/all-patient`,"",reqHeader)
}


//get department card


export const allDepartmentApi =async(reqHeader)=>{
    return await commonApi("GET",`${BASE_URL}/departments/all-department`,"",reqHeader)
}


//edit doctor

export const editDoctorApi = async(doctorId,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${BASE_URL}/doctors/edit/${doctorId}`,reqBody,reqHeader)
}


//delete doctor

export const deleteDoctorApi =async (doctorId,reqHeader)=>{
    return await commonApi("DELETE",`${BASE_URL}/doctor/remove/${doctorId}`,{},reqHeader)
}

//delete patient

export const deletePatientApi =async (patientId,reqHeader)=>{
    return await commonApi("DELETE",`${BASE_URL}/patients/remove/${patientId}`,{},reqHeader)
}
