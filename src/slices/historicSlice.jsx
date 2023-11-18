import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import historicService from "../services/historicService"

const initialState = {
    historics: [],
    historic: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//Insert a historic
export const insertHistoric = createAsyncThunk(
    "historic/insert",
    async (historic, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await historicService.inserthistoric(historic, token)
        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Get historic by Id
export const getHistoricById = createAsyncThunk("historic/get", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await historicService.getHistoricById(id, token);
  
    return data;
});

export const historicSlice = createSlice({
    name: "historic",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertHistoric.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(insertHistoric.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.historic = action.payload
                state.historics.push(state.historic)
                state.message = "Cliente cadastrado com sucesso."
            })
            .addCase(insertHistoric.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.historic = {}
            })
            .addCase(getHistoricById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHistoricById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.historics = action.payload;
                state.historics.reverse()
            })
    }
})

export const {resetMessage} = historicSlice.actions
export default historicSlice.reducer