import { createSlice } from '@reduxjs/toolkit';
const listSlice = createSlice({
    name: 'list',
    initialState: {
        listName: '',
        brandName: ''
    },
    reducers: {
        setList(state, action) {
            state.list = action.payload;
        },
    },
});
export const { setList } = listSlice.actions;
export default listSlice.reducer;