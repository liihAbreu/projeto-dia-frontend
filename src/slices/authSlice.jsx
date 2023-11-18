import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import authService from "../services/authService"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
    message: null

}

//Register an user
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        const data = await authService.register(user)

        //Check if errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Register an employee
export const registerEmployee = createAsyncThunk(
    "auth/registeremployee",
    async (user, thunkAPI) => {
        const data = await authService.registerEmployee(user)

        //Check if errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Register an user with Oauth
export const registerAuth = createAsyncThunk(
    "auth/registerOauth",
    async (user, thunkAPI) => {
        const data = await authService.registerAuth(user)

        //Check if errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout()
})

//Sing in an user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    const data = await authService.login(user);
  
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
  
    return data;
  });

//Sing in an user with OAuth
export const loginOAuth = createAsyncThunk("auth/loginOAuth", async (user, thunkAPI) => {
    const data = await authService.loginOAuth(user);
  
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
  
    return data;
  });


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
                state.message = "Cadastro realizado com sucesso."
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state,) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(registerAuth.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(registerAuth.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
                state.message = "Cadastro realizado com sucesso."
            })
            .addCase(registerAuth.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = null
            })
            .addCase(loginOAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginOAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(loginOAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(registerEmployee.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(registerEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
                state.message = "Cadastro realizado com sucesso."
            })
            .addCase(registerEmployee.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
