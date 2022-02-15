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

type Data = {
  name: string;
};

export default function handler(
  req: OptionsNextApiRequest,
  res: NextApiResponse<Data>
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

  console.log(
    "AAAAA",
    kind,
    Number(assetPrice),
    Number(strikePrice),
    time,
    Number(interestRate),
    Number(optionPrice)
  );

  // console.log('PPP', expirationDate - today)
  console.log(
    "AAAAA",
    simpleEuropeanOptionIV(
      kind,
      Number(assetPrice),
      Number(strikePrice),
      time,
      Number(interestRate),
      Number(optionPrice)
    )
  );
  console.log("calculator api");
  res.status(200).json({ name: "John Doe" });
}

// simple tests based from example from the book

// console.log(
//   "call simple",
//   roundNumber(simpleEuropeanOption("call", 60, 65, 0.25, 0.08, 0.3))
// );
// console.log(
//   "put dividend",
//   roundNumber(dividendEuropeanOption("put", 100, 95, 0.5, 0.1, 0.2, 0.05))
// );
// console.log(
//   "call future",
//   roundNumber(futuresEuropeanOption("call", 19, 19, 0.75, 0.1, 0.28))
// );
// console.log(
//   "put future",
//   roundNumber(futuresEuropeanOption("put", 19, 19, 0.75, 0.1, 0.28))
// );
// console.log(
//   "call currency",
//   roundNumber(currencyEuropeanOption("call", 1.56, 1.6, 0.5, 0.06, 0.12, 0.08))
// );

// function roundNumber(n: number) {
//   return Number(n.toFixed(4));
// }

// function simpleEuropeanOption(
//   callPutflag: "call" | "put",
//   price: number,
//   strike: number,
//   time: number,
//   rate: number,
//   volatility: number
// ) {
//   // for a simple options the carry is equal to the
//   // interest rate rate
//   return gBlackScholes(
//     callPutflag,
//     price,
//     strike,
//     time,
//     rate,
//     volatility,
//     rate
//   );
// }

// function dividendEuropeanOption(
//   callPutflag: "call" | "put",
//   price: number,
//   strike: number,
//   time: number,
//   rate: number,
//   volatility: number,
//   dividend: number
// ) {
//   // for dividend paying stock/index the carry is the difference
//   // of the interest rate and the anualized dividend
//   return gBlackScholes(
//     callPutflag,
//     price,
//     strike,
//     time,
//     rate,
//     volatility,
//     rate - dividend
//   );
// }

// function futuresEuropeanOption(
//   callPutflag: "call" | "put",
//   exchangeRate: number,
//   strike: number,
//   time: number,
//   rate: number,
//   volatility: number
// ) {
//   // for options on futures the carry is set to 0
//   return gBlackScholes(
//     callPutflag,
//     exchangeRate,
//     strike,
//     time,
//     rate,
//     volatility,
//     0
//   );
// }

// function currencyEuropeanOption(
//   callPutflag: "call" | "put",
//   price: number,
//   strike: number,
//   time: number,
//   rate: number,
//   volatility: number,
//   foreignRate: number
// ) {
//   // for dividend paying stock/index the carry is the difference
//   // of the interest rate and the anualized dividend
//   return gBlackScholes(
//     callPutflag,
//     price,
//     strike,
//     time,
//     rate,
//     volatility,
//     rate - foreignRate
//   );
// }

// // based on GBlackScholes from the
// // book The Complete Guide to Options Pricing Formulas
// // section 1.1.6
// function gBlackScholes(
//   callPutflag: "call" | "put",
//   price: number,
//   strike: number,
//   time: number,
//   rate: number,
//   volatility: number,
//   carry: number
// ) {
//   let d1 =
//     (Math.log(price / strike) + (carry + volatility ** 2 / 2) * time) /
//     (volatility * Math.sqrt(time));

//   let d2 = d1 - volatility * Math.sqrt(time);

//   if (callPutflag === "call") {
//     return (
//       price * Math.E ** ((carry - rate) * time) * cnd(d1) -
//       strike * Math.E ** (-rate * time) * cnd(d2)
//     );
//   }

//   // put
//   return (
//     strike * Math.E ** (-rate * time) * cnd(-d2) -
//     price * Math.E ** ((carry - rate) * time) * cnd(-d1)
//   );
// }

// // based on CND (Cumulative Normal Distribution) formula from the
// // book The Complete Guide to Options Pricing Formulas
// // section 13.1.1
// function cnd(x: number) {
//   let y = Math.abs(x);

//   let cnd = undefined;
//   let sumA = undefined;
//   let sumB = undefined;

//   if (y > 37) {
//     cnd = 0;
//   } else {
//     let exponential = Math.exp(-(y ** 2) / 2);
//     // let exponential = Math.pow(Math.E, Math.pow(-y, 2)/2)

//     if (y < 7.07106781186547) {
//       sumA = 0.0352624965998911 * y + 0.700383064443688;
//       sumA = sumA * y + 6.37396220353165;
//       sumA = sumA * y + 33.912866078383;
//       sumA = sumA * y + 112.079291497871;
//       sumA = sumA * y + 221.213596169931;
//       sumA = sumA * y + 220.206867912376;
//       sumB = 0.0883883476483184 * y + 1.75566716318264;
//       sumB = sumB * y + 16.064177579207;
//       sumB = sumB * y + 86.7807322029461;
//       sumB = sumB * y + 296.564248779674;
//       sumB = sumB * y + 637.333633378831;
//       sumB = sumB * y + 793.826512519948;
//       sumB = sumB * y + 440.413735824752;
//       cnd = (exponential * sumA) / sumB;
//     } else {
//       sumA = y + 0.65;
//       sumA = y + 4 / sumA;
//       sumA = y + 3 / sumA;
//       sumA = y + 2 / sumA;
//       sumA = y + 1 / sumA;
//       cnd = exponential / (sumA * 2.506628274631);
//     }
//   }

//   if (x > 0) {
//     return 1 - cnd;
//   }

//   return cnd;
// }
