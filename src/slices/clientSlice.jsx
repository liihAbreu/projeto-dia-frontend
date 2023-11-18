import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import clientService from "../services/clientService"

const initialState = {
    clients: [],
    client: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//Insert a Client
export const insertClient = createAsyncThunk(
    "client/insert",
    async (client, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await clientService.insertClient(client, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Delete a client
export const deleteClient = createAsyncThunk(
    "client/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await clientService.deleteClient(id, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Update a client
export const updateClient = createAsyncThunk(
    "client/update",
    async (client, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const id = client.id
        const data = await clientService.updateClient(client, id, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Get client by Id
export const getClientById = createAsyncThunk("client/getclient", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await clientService.getClientById(id, token);
  
    return data;
  });

//Get client by Id
export const getAllClientById = createAsyncThunk("client/getallclient", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await clientService.getAllClientById(id, token);
  
    return data;
});

//Get all Clients
export const getAllClients = createAsyncThunk(
    "client/getall",
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await clientService.getAllClients(token)

        return data
    }
)

//Search client by title
export const searchClient = createAsyncThunk(
    "client/search",
    async (query, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await clientService.searchClient(query,token)

        return data
    }
)

export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertClient.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(insertClient.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.client = action.payload
                state.clients.unshift(state.client)
                state.message = "Cliente cadastrado com sucesso."
            })
            .addCase(insertClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.client = {}
            })
            .addCase(deleteClient.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.clients = state.clients.filter((client) => {
                    return client._id !== action.payload.id
                })
                state.message = action.payload.message
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = {}
            })
            .addCase(updateClient.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.client = action.payload
                state.message = action.payload.message
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.client = {}
            })
            .addCase(getClientById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClientById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.client = action.payload;
            })
            .addCase(getAllClientById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllClientById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.clients = action.payload;
            })
            .addCase(getAllClients.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.clients = action.payload
            })
            .addCase(searchClient.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(searchClient.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.clients = action.payload
            })
    }
})

export const {resetMessage} = clientSlice.actions
export default clientSlice.reducer