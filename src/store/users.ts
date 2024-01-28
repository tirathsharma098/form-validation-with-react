import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface userI {
  name: string,
  age: number,
  sex: string,
  mobile: string,
  id_type: string,
  id_number: string,
  address: string,
  state: string,
  city: string,
  country: string,
  pincode: number
}
const initial:Array<userI> = [];

const userSlice = createSlice({
  name: 'users',
  initialState: initial,
  reducers: {
    addUser(state:Array<userI>, action:PayloadAction<userI>) {
      return [ action.payload, ...state ];
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
