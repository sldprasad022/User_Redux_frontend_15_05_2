
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './component/user/AddUser';
import TotalUsers from './component/user/TotalUsers';
import { ToastContainer } from "react-toastify";
import MainRoute from './MainRoute';

function App() {
  return (
    <div className="App">
      <ToastContainer position='top-right' autoClose={3000} />
        <MainRoute/>
    </div>
  );
}

export default App;
