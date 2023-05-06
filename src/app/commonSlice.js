import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSnackbarOpen: false,
    snackbarMessage: '',
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            state.isSnackbarOpen = action.payload.open
            state.snackbarMessage = action.payload.msg
        }
    }
})

export const { openSnackbar } = commonSlice.actions
export default commonSlice.reducer