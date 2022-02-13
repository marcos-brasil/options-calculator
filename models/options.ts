import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const option = createSlice({
  name: "option",
  initialState: {
    assetPrice: "",
    expiration: "",
    optionPrice: "",
    strikePrice: "",
    numberContracts: "",
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
