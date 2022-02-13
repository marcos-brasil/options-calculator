import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

let todayEpoch = Date.now();
let twoWeeks = 1000 * 60 * 60 * 24 * 14;

let expirationDate = new Date(todayEpoch + twoWeeks);


export const option = createSlice({
  name: "option",
  initialState: {
    assetPrice: "100",
    expiration: `${expirationDate.getFullYear()}-${
      expirationDate.getMonth() + 1
    }-${expirationDate.getDate()}`,
    optionPrice: "1.50",
    strikePrice: "110",
    numberContracts: "1",
    kind: "Call",
  },
  reducers: {
    updateAssetPrice(state, { payload }: PayloadAction<string>) {
      state.assetPrice = payload;
    },
    updateExpiration(state, { payload }: PayloadAction<string>) {
      state.expiration = payload;
    },
    updateOptionPrice(state, { payload }: PayloadAction<string>) {
      state.optionPrice = payload;
    },
    updateStrikePrice(state, { payload }: PayloadAction<string>) {
      state.strikePrice = payload;
    },
    updateNumberContracts(state, { payload }: PayloadAction<string>) {
      state.numberContracts = payload;
    },
    updateKind(state, { payload }: PayloadAction<string>) {
      state.kind = payload;
    },
  },
});

export let {
  updateAssetPrice,
  updateExpiration,
  updateOptionPrice,
  updateStrikePrice,
  updateNumberContracts,
  updateKind,
} = option.actions;

export default option.reducer;
