import React, { useContext, useEffect, useState } from 'react'
import { allPatientApi } from '../services/allAPI';
import { addPatientResponseContext } from '../Context/ContextShare';

function PatientTable() {

    const {addPatientResponse , setAddPatientResponse}=useContext(addPatientResponseContext)

    const [patientData, setPatientData] = useState([])

    const getAllPatient = async () => {
        const result = await allPatientApi()
        console.log(result);
        setPatientData(result.data)
    }

    useEffect(() => {
        getAllPatient()
    }, [addPatientResponse])

    return (
        <div>
            <div className='text-light d-flex  justify-content-center  align-items-center mt-5 px-2'>
                <table style={{ width: "800px" }}>

                    <tr>

                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Id</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Room No</th>
                    </tr>
                    {patientData?.length > 0 ?
                        patientData?.map((item) => (<tr>
                            {/* <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>01</td> */}
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.patientId}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.patientName}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.roomNo}</td>
                        </tr>))
                        : <p>null</p>
                    }

                </table>
            </div>
        </div>
    )
}

export default PatientTable