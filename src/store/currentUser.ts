import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface userInitialI {
    name: string,
    age: number,
    sex: string,
    mobile: string,
    id_type: string,
    id_number: string
  }
const initial:userInitialI = {
    name: "",
    age: 0,
    sex: "",
    mobile: "",
    id_type: "",
    id_number: "",
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initial,
  reducers: {
    addUserValue(state:userInitialI, action:PayloadAction<userInitialI>) {
      return {...state, ...action.payload };
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
export default currentUserSlice.reducer;
