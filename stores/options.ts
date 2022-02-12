import {createSlice} from '@reduxjs/toolkit'

export const option = createSlice({
  name: 'slice',
  initialState: {
    assetPrice: null,
    expiration: null,
    optionPrice: null,
    strikePrice: null,
    numberContract: null,

  },
  reducers: {
    updateAssetPrice (state, {payload}) {
      state.assetPrice = payload
    }
  }
})

export let {updateAssetPrice} = option.actions

export default option.reducer