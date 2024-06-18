import React, { useEffect, useState } from 'react'
import axios from 'axios';

 const Dashboard = ({auth,Setauth}) => {
    const [input,setinput]=useState([]);
    useEffect(()=>{
        const items=async()=>{
            try{
                const {data}=await axios.get("/details")
                if(data){
                    setinput(data);
                    console.log(data)
                }else{
                    setinput([{Username:"NO DATA FOUND  "}])
                }

            }catch(error){
                console.log(error.message);
            }
           


        }
        items();

    },[])
  return (
   
   <div>{(auth)?(
    <table className='table-auto w-full shadow-md mt-5 rounded'>
        <thead className='bg-neutral-500 text-gray-100  tracking-wider' >
          <tr>
            <th className='p-4'>Name</th>
            <th className='p-4'>Date-of-birth</th>
            <th className='p-4'>Email id</th>
            <th className='p-4'>Password</th>
          </tr>
          
        </thead>
        <tbody>
          {
            
            (input.map((item,index)=>(
              <tr className="bg-card mt-6 rounded bg-slate-800  text-gray-100" key={index}>
                <td className="p-1">{item.Username}</td>
                <td className="p-1">{item.DOB}</td>
                <td className="p-1">{item.email}</td>
                <td className="p-1">{item.password}</td>
              
              </tr>

            )))
          }
        </tbody>
      </table>
      ):(<h1 className='text-4xl font-bold mx-auto text-indigo-700'> First Login </h1>)}

    </div>
        
        

   
  )
}
export default Dashboard