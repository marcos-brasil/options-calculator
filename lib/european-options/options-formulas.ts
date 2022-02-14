// formulas taken from the book
// The Complete Guide to Options Pricing Formulas Second Edition
// by Espen Gaarder Haug

import {
  generalBlackScholes,
  generalBlackScholesIV,
} from "./general-black-scholes";

// section 1.1.1
export function simpleEuropeanOption(
  callPutflag: "call" | "put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  volatility: number
) {
  // for a simple options the carry is equal to the
  // interest rate rate
  return generalBlackScholes(
    callPutflag,
    price,
    strike,
    time,
    rate,
    volatility,
    rate
  );
}

export function simpleEuropeanOptionIV(
  callPutflag: "call" | "put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  optionPrice: number,
  precision = 4
) {
  // for a simple options the carry is equal to the
  // interest rate rate
  return generalBlackScholesIV(
    callPutflag,
    price,
    strike,
    time,
    rate,
    optionPrice,
    rate,
    precision
  );
}

// section 1.1.2
export function dividendEuropeanOption(
  callPutflag: "call" | "put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  volatility: number,
  dividend: number
) {
  // for dividend paying stock/index the carry is the difference
  // of the interest rate and the anualized dividend
  return generalBlackScholes(
    callPutflag,
    price,
    strike,
    time,
    rate,
    volatility,
    rate - dividend
  );
}

export function dividendEuropeanOptionIV(
  callPutflag: "call" | "put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  optionPrice: number,
  dividend: number,
  precission = 4
) {
  // for dividend paying stock/index the carry is the difference
  // of the interest rate and the anualized dividend
  return generalBlackScholesIV(
    callPutflag,
    price,
    strike,
    time,
    rate,
    optionPrice,
    rate - dividend,
    precission
  );
}

// section 1.1.3
export function futuresEuropeanOption(
  callPutflag: "call" | "put",
  exchangeRate: number,
  strike: number,
  time: number,
  rate: number,
  volatility: number
) {
  // for options on futures the carry is set to 0
  return generalBlackScholes(
    callPutflag,
    exchangeRate,
    strike,
    time,
    rate,
    volatility,
    0
  );
}

export function futuresEuropeanOptionIV(
  callPutflag: "call" | "put",
  exchangeRate: number,
  strike: number,
  time: number,
  rate: number,
  optionPrice: number,
  precission = 4
) {
  // for options on futures the carry is set to 0
  return generalBlackScholesIV(
    callPutflag,
    exchangeRate,
    strike,
    time,
    rate,
    optionPrice,
    0,
    precission
  );
}

// section 1.1.5
export function currencyEuropeanOption(
  callPutflag: "call" | "put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  volatility: number,
  foreignRate: number
) {
  // for dividend paying stock/index the carry is the difference
  // of the interest rate and the anualized dividend
  return generalBlackScholes(
    callPutflag,
    price,
    strike,
    time,
    rate,
    volatility,
    rate - foreignRate
  );
}

export function currencyEuropeanOptionIV(
  callPutflag: "call" | "put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  optionPrice: number,
  foreignRate: number,
  precision = 4
) {
  // for dividend paying stock/index the carry is the difference
  // of the interest rate and the anualized dividend
  return generalBlackScholesIV(
    callPutflag,
    price,
    strike,
    time,
    rate,
    optionPrice,
    rate - foreignRate,
    precision
  );
}
