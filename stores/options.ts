import { createSlice } from "@reduxjs/toolkit";

export const option = createSlice({
  name: "option",
  initialState: {
    assetPrice: null,
    expiration: null,
    optionPrice: null,
    strikePrice: null,
    contracts: null,
    kind: null,
  },
  reducers: {
    updateAssetPrice(state, { payload }) {
      state.assetPrice = payload;
    },
    updateExpiration(state, { payload }) {
      state.expiration = payload;
    },
    updateOptionPrice(state, { payload }) {
      state.optionPrice = payload;
    },
    updateStrikePrice(state, { payload }) {
      state.strikePrice = payload;
    },
    updateContracts(state, { payload }) {
      state.contracts = payload;
    },
    updateKind(state, { payload }) {
      state.kind = payload;
    },
  },
});

export let {
  updateAssetPrice,
  updateExpiration,
  updateOptionPrice,
  updateStrikePrice,
  updateContracts,
  updateKind,
} = option.actions;

export default option.reducer;
