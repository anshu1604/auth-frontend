import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSnackbarOpen: false,
    snackbarMessage: '',
    userInformation: '',
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            state.isSnackbarOpen = action.payload.open
            state.snackbarMessage = action.payload.msg
        },
        userProfileDetails: (state, action) => {
            state.userInformation = action.payload
        }
    }
})

export const { openSnackbar, userProfileDetails } = commonSlice.actions
export default commonSlice.reducer