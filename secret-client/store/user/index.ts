import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  address: string;
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const initialState: CounterState = {
  address: ZERO_ADDRESS,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: typeof initialState, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
