import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@/interface/baseType';
import { AbstractProvider, JsonRpcApiProvider, JsonRpcSigner } from 'ethers';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

interface IUserState {
  address: string;
  signMsg: Nullable<string>;
  signer: Nullable<JsonRpcSigner>;
  provider: Nullable<AbstractProvider | JsonRpcApiProvider>;
}

const initialState: IUserState = {
  address: ZERO_ADDRESS,
  signMsg: null,
  signer: null,
  provider: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setSigner: (state, action: PayloadAction<JsonRpcSigner>) => {
      state.signer = action.payload;
      state.address = action.payload.address;
      state.provider = action.payload.provider;
    },

    setProvider: (state, action: PayloadAction<AbstractProvider | JsonRpcApiProvider>) => {
      state.provider = action.payload;
    },

    setSignMsg: (state, action: PayloadAction<string>) => {
      state.signMsg = action.payload;
    },
  },
});

export default slice.reducer;

export const { setUser, setSigner, setSignMsg, setProvider } = slice.actions;
