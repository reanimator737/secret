import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@/interface/baseType';
import { AbstractProvider, JsonRpcApiProvider, JsonRpcSigner } from 'ethers';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

interface Connector {
  signMsg: Nullable<string>;
  signer: Nullable<JsonRpcSigner>;
  provider: Nullable<AbstractProvider | JsonRpcApiProvider>;
}

const initialState: Connector = {
  signMsg: null,
  signer: null,
  provider: null,
};

const slice = createSlice({
  name: 'connector',
  initialState,
  reducers: {
    setSigner: (state, action: PayloadAction<JsonRpcSigner>) => {
      state.signer = action.payload;
      state.provider = action.payload.provider;
    },

    setProvider: (state, action: PayloadAction<AbstractProvider | JsonRpcApiProvider>) => {
      state.provider = action.payload;
    },

    setSignMsg: (state, action: PayloadAction<string>) => {
      state.signMsg = action.payload;
    },

    disconnect: () => {
      return initialState;
    },
  },
});

export default slice.reducer;

export const { setSigner, setSignMsg, setProvider, disconnect } = slice.actions;
