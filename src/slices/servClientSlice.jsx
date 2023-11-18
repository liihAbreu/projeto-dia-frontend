import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import servClientService from "../services/servClientService"

const initialState = {
    services: [],
    service: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//Insert a service
export const insertServiceClient = createAsyncThunk(
    "service/insert",
    async (service, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await servClientService.insertServiceClient(service, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Delete a service
export const deleteServiceClient = createAsyncThunk(
    "service/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await servClientService.deleteService(id, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Delete all service
export const deleteAllService = createAsyncThunk(
    "service/deleteAll",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await servClientService.deleteAllService(id, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Add a service Client
export const updateServiceClient = createAsyncThunk(
    "service/updateservice",
    async (serviceData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await servClientService.updateServiceClient(serviceData, serviceData.serviceId, token);
        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
      
        return data;
    }
)

//finish a service Client
export const updateFinishService = createAsyncThunk(
    "service/updatefinishservice",
    async (serviceData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await servClientService.updateFinishService(serviceData, serviceData.serviceId, token);
        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
      
        return data;
    }
)

//amount received a service Client
export const updateReceived = createAsyncThunk(
    "service/updatereceived",
    async (serviceData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await servClientService.updateReceived(serviceData, serviceData.serviceId, token);
        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
      
        return data;
    }
)

//Get services client by Id
export const getServiceClientById = createAsyncThunk("service/getservice", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await servClientService.getServiceClientById(id, token);
  
    return data;
  });

//Get all Services
export const getAllServices = createAsyncThunk(
    "service/getall",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await servClientService.getAllServices(id,token)

        return data
    }
)

export const servClientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertServiceClient.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(insertServiceClient.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.service = [action.payload]
                state.services.unshift(...state.service)
                state.message = "Serviço cadastrado com sucesso."
            })
            .addCase(insertServiceClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.service = {}
            })
            .addCase(deleteServiceClient.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteServiceClient.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.services = state.services.filter((serv) => {
                    return serv._id !== action.payload.id
                })
                state.message = action.payload.message
            })
            .addCase(deleteServiceClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = {}
            })
            .addCase(deleteAllService.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteAllService.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.services = state.services.filter((serv) => {
                    return serv._id !== action.payload.id
                })
                state.message = action.payload.message
            })
            .addCase(deleteAllService.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = {}
            })
            .addCase(updateServiceClient.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.services = state.services.map((servico) => {
                    if(servico._id == action.payload.service._id){
                        return servico = action.payload.service
                    }
                    return servico
                })
                state.message = action.payload.message;
            })
            .addCase(updateServiceClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateFinishService.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.services = state.services.map((servico) => {
                    if(servico._id == action.payload.serviceFinish._id){
                        return servico = action.payload.serviceFinish
                    }
                    return servico
                })
                state.message = action.payload.message;
            })
            .addCase(updateFinishService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateReceived.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.services = state.services.map((servico) => {
                    if(servico._id == action.payload.serviceReceived._id){
                        return servico = action.payload.serviceReceived
                    }
                    return servico
                })
                state.message = action.payload.message;
            })
            .addCase(updateReceived.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getServiceClientById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getServiceClientById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.services = action.payload;
            })
            .addCase(getAllServices.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.services = action.payload
            })
    }
})

export const {resetMessage} = servClientSlice.actions
export default servClientSlice.reducer