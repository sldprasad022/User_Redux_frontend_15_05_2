import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { addUser } from './UserSlice';
import { toast } from "react-toastify";
import { Link, NavLink } from 'react-router-dom';

const AddUser = () => {
  

const [formValues, setFormValues] =useState({
    userName:'',
    email:'',
    mobileNumber:'',
    department:'',
    salary :'',
    password:''
});

const handleChange = (e)=>{
    const {name,value}=e.target;
    setFormValues((prevData)=>({
      ...prevData,
      [name]:value,
    }))
}

const dispatch = useDispatch();

const {error,status,message} = useSelector((state)=>state.user);

console.log(error);

// const handleSubmit = (e)=>{
//     e.preventDefault();

//     dispatch(addUser(formValues)).then(({meta})=>{
//       if (meta.requestStatus === "fulfilled")
//       {
//         toast.success('User Created Successfully!!')
//         console.log('sssssssssssss')
//       }
//       else 
//       {
//         toast.error( error || 'something went wrong')
//       }
//     });

//     setFormValues({
//         userName: '',
//         email: '',
//         mobileNumber: '',
//         department: '',
//         salary: '',
//         password: ''
//       });
// }

const handleSubmit = async (e) => {
  e.preventDefault();

  try 
  {
    await dispatch(addUser(formValues)).unwrap();
    toast.success(message);
    setFormValues({
      userName: '',
      email: '',
      mobileNumber: '',
      department: '',
      salary: '',
      password: ''
    });
  } 
  catch (error)
  {
    toast.error(error || "Something went wrong");
  }
};



  return (
    <div className=''>
        <h1 className='text-center text-2xl'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-lg w-[50%] p-10 mx-auto'>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
              <input
                required
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
                required
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
                required
                type="number"
                id="mobileNumberil"
                name="mobileNumber"
                value={formValues.mobileNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              /> 
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Department</label>
              <input
                required
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
                required
                type="number"
                id="salary"
                name="salary"
                value={formValues.salary}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              /> 
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              /> 
            </div>

            <p className='text-red-800 text-xl text-center'>{error}</p>

            {/* <div className='flex justify-center'>
              <button type='submit' className='text-2xl bg-cyan-400 rounded-lg p-2'>Sign UP</button>
            </div> */}
            <div className="flex justify-center gap-4">
              <button type="submit" className="text-2xl bg-cyan-400 rounded-lg p-2 px-6 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed" disabled={status === "loading"}>
                {
                  status === "loading" ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span>Submitting....</span>
                </>
              ) : (
              "Sign Up"
              )}
              </button>
              <Link className='p-2 bg-blue-400' to='/allUsers'>TotalUsers</Link>
            </div>


        </form>
    </div>
  )
}

export default AddUser