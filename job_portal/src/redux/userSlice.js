import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userAuth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        }
    }
});
export const {setLoading, setUser} = userSlice.actions;
export default userSlice.reducer;