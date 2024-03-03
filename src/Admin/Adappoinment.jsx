import React, { useEffect, useState } from 'react'
import { allAppointmentApi } from '../services/allAPI';

function Adappoinment() {

  const [allAppointment,setAllAppointment]=useState([])
    
const getAllAppointment = async ()=>{
  const result =await allAppointmentApi()
  console.log(result);
  setAllAppointment(result.data)
}


useEffect (()=>{
  getAllAppointment()
},[])

  return (

    <div>
       <div class='bg-light d-flex justify-content-between align-items-center p-3'>
    <h2 class='text-dark fw-bold'>Appointments</h2>
    {/* <button class='btn btn-success rounded'>Requests</button> */}
</div>


        <div className='text-light d-flex  justify-content-center  align-items-center mt-5 px-2'>
            <table style={{width:"800px"}}>

             <tr>
                    {/* <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                        No
                    </th> */}
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Age</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Doctor</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
                     </tr>
{allAppointment?.length>0?
allAppointment?.map((item)=>( <tr>
  {/* <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>01</td> */}
  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.fullname}</td>
  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.age}</td>
  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.doctor}</td>
  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.date}</td>
 </tr>))
            : <p>null</p>

}
           
            </table>
        </div>
    </div>
  )
}

export default Adappoinment