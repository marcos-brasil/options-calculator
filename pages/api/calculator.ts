// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { roundNumber } from "../../lib";

import {
  currencyEuropeanOption,
  dividendEuropeanOption,
  futuresEuropeanOption,
  simpleEuropeanOption,
  simpleEuropeanOptionIV,
} from "../../lib/european-options/options-formulas";

import { OptionsGreek } from "../../lib/options-greek-types";

// let a = require('./index.node')
// // @ts-ignore
// import n from './index.node'

// import('./index.node').then(a => {
//   console.log((a))

// })

// 2022-02-14
// https://www.epochconverter.com
let epochYear = 31556926 * 1000;

interface OptionsNextApiRequest extends NextApiRequest {
  body: {
    assetPrice: string;
    expiration: string;
    optionPrice: string;
    strikePrice: string;
    numberContracts: string;
    kind: "Call" | "Put";
    interestRate: string;
  };
}

export default function handler(
  req: OptionsNextApiRequest,
  res: NextApiResponse<OptionsGreek>
) {
  console.log(req.body);
  let { kind, assetPrice, expiration, optionPrice, strikePrice, interestRate } =
    req.body;

  let expirationDate = new Date(expiration);

  let today = new Date();
  let todayYear = today.getFullYear();
  let todayMonth = today.getMonth() + 1;
  let todayDay = today.getDate();

  today = new Date(`${todayYear}-${todayMonth}-${todayDay}`);

  let time = roundNumber(
    (expirationDate.getTime() - today.getTime()) / epochYear,
    4
  );

  let volatility = simpleEuropeanOptionIV(
    kind,
    Number(assetPrice),
    Number(strikePrice),
    time,
    Number(interestRate),
    Number(optionPrice)
  );


  res.status(200).json({
    "Vanila Greeks": [
      { legend: "Implied Volatility", value: (volatility * 100).toFixed(2) },
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
  });

  console.log("calculator api");
  // res.status(200).json({ name: "John Doe" });
}

// "Rho Greeks": [
//   { legend: "Implied Volatility", value: "-" },
//   { legend: "deltay", value: "-" },
//   { legend: "gamma", value: "-" },
//   { legend: "theta", value: "-" },
//   { legend: "vega", value: "-" },
// ],

// "Volatility-Time Greeks": [
//   { legend: "Implied Volatility", value: "-" },
//   { legend: "deltay", value: "-" },
//   { legend: "gamma", value: "-" },
//   { legend: "theta", value: "-" },
//   { legend: "vega", value: "-" },
// ],

// "Vega Greeks": [
//   { legend: "Implied Volatility", value: "-" },
//   { legend: "deltay", value: "-" },
//   { legend: "gamma", value: "-" },
//   { legend: "theta", value: "-" },
//   { legend: "vega", value: "-" },
// ],
