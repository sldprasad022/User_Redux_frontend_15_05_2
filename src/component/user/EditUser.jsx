import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { fetchAllUsersData, updateUser } from './UserSlice';
import { toast } from "react-toastify";

const EditUser = ({userData,setEditState}) => {

   const [formValues, setFormValues] =useState({
       userName:'',
       email:'',
       mobileNumber:'',
       department:'',
       salary :''
   });
   
   const handleChange = (e)=>{
       const {name,value}=e.target;
       setFormValues((prevData)=>({
         ...prevData,
         [name]:value,
       }))
   } 

   
   useEffect(()=>{
        if (userData)
        {
            setFormValues({
                userName:userData.userName,
                email:userData.email,
                mobileNumber:userData.mobileNumber,
                department:userData.department,
                salary :userData.salary
            })
        }
   },[userData])

   const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', userData.userId);
    formData.append('userName', formValues.userName);
    formData.append('email', formValues.email);
    formData.append('mobileNumber', formValues.mobileNumber);
    formData.append('department', formValues.department);
    formData.append('salary', formValues.salary);

    console.log([...formData.entries()]); // debug log
    // model -1
    //dispatch(updateUser(formData));
    //model-2
    dispatch(updateUser(formData)).unwrap()
    .then(() => {
      dispatch(fetchAllUsersData());
      toast.success("User updated successfully");
    })
    .catch(err => toast.error(err));


    setFormValues({
        userName: '',
        email: '',
        mobileNumber: '',
        department: '',
        salary: '',
    });

    setEditState(false);
};



  return (
    <div className='w-full'>
        <h1 className='text-center text-2xl'>Edit</h1>
        <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-lg w-[50%] p-10 mx-auto'>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formValues.userName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />  
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              /> 
            </div>

            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="number"
                id="mobileNumberil"
                name="mobileNumber"
                value={formValues.mobileNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              /> 
            </div>

            <div className="mb-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formValues.department}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              /> 
            </div>

            <div className="mb-4">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formValues.salary}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              /> 
            </div>


            <div className='flex justify-center gap-6'>
              <button type='submit' className='text-2xl bg-cyan-400 rounded-lg p-2'>Submit</button>
              <button type="button" onClick={() => setEditState(false)} className="px-4 py-2 bg-gray-300 text-black rounded">Cancel</button>

            </div>

        </form>
    </div>
  )
}

export default EditUser