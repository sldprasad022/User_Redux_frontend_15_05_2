import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchAllUsersData } from './UserSlice';
import EditUser from './EditUser';
import { toast } from "react-toastify";

const TotalUsers = () => {

    const[editstate,setEditState]=useState(false);
    const[selectedUser,setSelectedUser]=useState(null);

    const dispatch = useDispatch();

    const allUsersData = useSelector((state)=>state.user.users);

    const {error,status} = useSelector((state)=>state.user);



    console.log(allUsersData);

    useEffect(()=>{
        dispatch(fetchAllUsersData());
    },[]);


    const handleDelete = (userId)=>{
        if (window.confirm("Are you sure you want to delete this user?")) 
        {
            //1st model
            //dispatch(deleteUser(userId));
            //2nd model
            dispatch(deleteUser(userId)).unwrap()
                .then(() => toast.success("User deleted successfully."))
                .catch(err => toast.error(err));
        }
    }

    if (status === 'loading') return <p className='text-center text-2xl'>Loading...</p>;
    if (error) return <p className='text-red-500 text center'>{error}</p>;


  return (
    <>
        <div className='p-32'>
            <table className="table-auto border-collapse border-2 border-black w-full">
                <thead>
                    <tr className="border-2 border-black">
                    <th className="border border-black px-4 py-2">UserId</th>
                    <th className="border border-black px-4 py-2">User Name</th>
                    <th className="border border-black px-4 py-2">Email</th>
                    <th className="border border-black px-4 py-2">Department</th>
                    <th className="border border-black px-4 py-2">Role</th>
                    <th className="border border-black px-4 py-2">Action</th>
                    </tr>
                </thead>
            {/* <tbody>
                {
                    allUsersData.map((eachUser)=>(
                        <tr key={eachUser.userId} className='text-center'>
                            <td>{eachUser.userId}</td>
                            <td>{eachUser.userName}</td>
                            <td>{eachUser.email}</td>
                            <td>{eachUser.department}</td>
                            <td>{eachUser.role}</td>
                            <td className='flex gap-2 justify-center'>
                                <button className='p-2 bg-blue-800' onClick={()=>
                                    {
                                        setEditState(true);
                                        setSelectedUser(eachUser);
                                    }
                                }>
                                    Edit
                                </button>
                                <button className='p-2 bg-red-800' onClick={()=>handleDelete(eachUser.userId)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody> */}
                <tbody>
                        {
                            allUsersData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-lg text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                allUsersData.map((eachUser) => (
                                    <tr key={eachUser.userId} className='text-center p-2'>
                                        <td className='border border-2 border-black p-2'>{eachUser.userId}</td>
                                        <td className='border border-2 border-black p-2'>{eachUser.userName}</td>
                                        <td className='border border-2 border-black p-2'>{eachUser.email}</td>
                                        <td className='border border-2 border-black p-2'>{eachUser.department}</td>
                                        <td className='border border-2 border-black p-2'>{eachUser.role}</td>
                                        <td className='flex gap-2 justify-center border border-2 border-b-black p-2'>
                                            <button className='p-2 bg-blue-800' onClick={() => {
                                                setEditState(true);
                                                setSelectedUser(eachUser);
                                            }}>
                                                Edit
                                            </button>
                                            <button className='p-2 bg-red-800' onClick={() => handleDelete(eachUser.userId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                </tbody>
            </table>
        </div>

        
        {/* Edit User */}
        {editstate && selectedUser &&(
            <div className='fixed top-2 right-[800px] w-[800px] flex justify-center items-center bg-opacity-50 z-50'>
                <div className='w-full h-[708px] bg-white p-6 shadow-lg relative'>
                    <button className='absolute top-4 right-4 text-xl' onClick={()=>setEditState(false)}>
                        X
                    </button>
                    <EditUser userData={selectedUser} setEditState={setEditState}/>
                </div>
            </div>
        )}

    </>
  )
}

export default TotalUsers