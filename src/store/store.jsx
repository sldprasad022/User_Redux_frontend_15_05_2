import { configureStore } from '@reduxjs/toolkit'
import userreducer from "../component/user/UserSlice";

const store = configureStore({
    reducer :{
        user :userreducer
    }
})

export default store