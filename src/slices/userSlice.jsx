import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState = {
    user: {},
    users:[],
    error: false,
    success: false,
    loading: false,
    message: null
}

//Get user details
export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.profile(user, token)
        return data
    }
)

//Get all users
export const getAllUsers = createAsyncThunk(
    "user/employee",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.getAllUsers(user, token)

        return data
    }
)

//Get all employee by id
export const getAllUsersById = createAsyncThunk(
    "user/employeeAll",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.getAllUsersById(id, token)
        return data
    }
)

//Update user details
export const updateProfile = createAsyncThunk(
    "user/update",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.updateProfile(user, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Get user details
export const getUserDetails = createAsyncThunk(
    "user/get",
    async (id) => {
        const data = await userService.getUserDetails(id)

        return data
    }
)

//Search users by name
export const searchEmployee = createAsyncThunk(
    "user/search",
    async (query, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.searchEmployee(query,token)

        return data
    }
)

//Update user employee
export const updateEmployee = createAsyncThunk(
    "user/updateEmployee",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.updateEmployee(user, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Delete a user
export const deleteUser = createAsyncThunk(
    "user/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.deleteUser(id, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.users = action.payload
            })
            .addCase(getAllUsersById.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getAllUsersById.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.users = action.payload
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
                state.message = "Usuário atualizado com sucesso."
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = {}
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
            })
            .addCase(searchEmployee.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(searchEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.users = action.payload
            })
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
                state.message = "Usuário atualizado com sucesso."
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = {}
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.users = state.users.filter((user) => {
                    return user._id !== action.payload.id
                })
                state.message = action.payload.message
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = {}
            })

    }
})

export const {resetMessage} = userSlice.actions
export default userSlice.reducer