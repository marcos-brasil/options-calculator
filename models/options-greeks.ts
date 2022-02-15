import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { OptionsGreek } from "../lib/options-greek-types";

export const optionGreeks = createSlice({
  name: "optionGreeks",
  initialState: {
    "Vanila Greeks": [
      { legend: "Implied Volatility", value: "-" },
      { legend: "Delta", value: "-" },
      { legend: "Gamma", value: "-" },
      { legend: "Theta", value: "-" },
      { legend: "Vega", value: "-" },
    ],
    Probabilities: [
      { legend: "At the Money", value: "-" },
      { legend: "Out of The Money", value: "-" },
      { legend: "Touch the Strike", value: "-" },
    ],
    "Delta Greeks": [
      { legend: "Delta", value: "-" },
      { legend: "DdeltaDvol", value: "-" },
      { legend: "DvannaDvol", value: "-" },
      { legend: "DdeltaDtime", value: "-" },
      { legend: "Elasticity", value: "-" },
    ],
    "Gamma Greeks": [
      { legend: "Gamma", value: "-" },
      { legend: "Maximal Gamma", value: "-" },
      { legend: "GammaP", value: "-" },
      { legend: "DgammaDvol", value: "-" },
      { legend: "DgammaDspot", value: "-" },
      { legend: "DgammaDtime", value: "-" },
    ],
    "Vega Greeks": [
      { legend: "Vega", value: "-" },
      { legend: "VegaP", value: "-" },
      { legend: "Elasticity", value: "-" },
      { legend: "DvegaDvol", value: "-" },
      { legend: "DvommaDvol", value: "-" },
      { legend: "DvegaDtime", value: "-" },
    ],

    "Variance Greeks": [
      { legend: "Variance Vega", value: "-" },
      { legend: "DdeltaDvar", value: "-" },
      { legend: "Variance Vomma", value: "-" },
      { legend: "Variance Ultima", value: "-" },
    ],
  },

  reducers: {
    updateGreeks(_state, { payload }: PayloadAction<OptionsGreek>) {
      // Object.assign(state, payload);
      return payload;
    },
  },
});


export let {updateGreeks} = optionGreeks.actions

export default optionGreeks.reducer