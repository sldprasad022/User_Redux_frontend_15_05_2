import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddUser from './component/user/AddUser'
import TotalUsers from './component/user/TotalUsers'

const MainRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<AddUser/>}/>
            <Route path='/allUsers' element={<TotalUsers/>} />
        </Routes>
    </div>
  )
}

export default MainRoute