
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addUser = createAsyncThunk('user/add', async (user, { rejectWithValue }) => {
        try
        {
            const response = await axios.post(`http://localhost:9292/api/user/save`, user);
            return response.data;
        } 
        catch (err) 
        {
            if (err.response && err.response.data) 
            {
                return rejectWithValue(err.response.data.message || "Something went wrong");
            }
                return rejectWithValue(err.message);
        }
});


export const fetchAllUsersData = createAsyncThunk('user/fetchAll',async()=>{
    const response = await axios.get(`http://localhost:9292/api/user/fetchAll`);
    console.log(response.data);
    return response.data;
})


export const deleteUser = createAsyncThunk('user/deleteUser',async(userId)=>{
    const response = await axios.delete(`http://localhost:9292/api/user/deleteByUserId/${userId}`);
    return response.data;

})



export const updateUser = createAsyncThunk('user/edituser', async (formData) => {
    const userId = formData.get('userId'); // get userId from FormData

    console.log(formData)

    const response = await axios.put(`http://localhost:9292/api/user/update/${userId}`,formData,
    {
        headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
});



const UserSlice = createSlice({
    name :'user',
    initialState :{
        users :[],
        error :'',
        status:'idle',
        message :''
    },
    reducers :{},
    extraReducers :(builder)=>{
            builder
            .addCase(addUser.pending,(state)=>{
                state.status = "loading";
                state.error = null; // clear previous errors
                state.message = ''; // clear previous message
            })
            .addCase(addUser.fulfilled,(state,action)=>{
                state.status = "succeeded";
                console.log(action.payload);
                state.users.push(action.payload);
                state.message = "User added successfully.";
                state.error = null; // clear previous errors
            })
            .addCase(addUser.rejected,(state,action)=>{
                state.status = "failed";
                console.log(action.payload);
                state.error = action.payload;
                state.message = '';
            })
            .addCase(fetchAllUsersData.pending,(state)=>{
                state.status ='loading';
                state.error = null; // clear previous errors
                state.message = '';
            })
            .addCase(fetchAllUsersData.fulfilled,(state,action)=>{
                state.status ='succeeded';
                state.users = action.payload;
                state.error = null; // clear previous errors
                state.message = 'Fetched all users successfully.';
            })
            .addCase(fetchAllUsersData.rejected,(state,action)=>{
                state.status = 'rejected';
                state.error = action.error.message;
                state.message = '';
            })
            .addCase(deleteUser.pending,(state)=>{
                state.status ='loading';
                state.error = null; // clear previous errors
                state.message = '';
            })
            .addCase(deleteUser.fulfilled,(state,action)=>{
                state.status = 'succeeded';
                const deletedUserId = action.meta.arg;
                state.users = state.users.filter(user => user.userId !== deletedUserId);
                state.error = null; // clear previous errors
                state.message = 'User deleted successfully.';
            })
            .addCase(deleteUser.rejected,(state,action)=>{
                state.status = 'failed';
                state.error = action.error.message;
                state.message = '';
            })

            .addCase(updateUser.pending,(state)=>{
                state.status ='pending';
                state.error = null; // clear previous errors
                state.message = '';
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedUser = action.payload;
                const index = state.users.findIndex(user => user.userId === updatedUser.userId);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
                state.error = null; // clear previous errors
                state.message = 'User updated successfully.';
            })

            .addCase(updateUser.rejected,(state,action)=>{
                state.status = 'failed';
                state.error = action.error.message;
                state.message = '';
            })
            
    }
})

export default UserSlice.reducer;