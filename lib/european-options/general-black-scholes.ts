// formulas taken from the book
// The Complete Guide to Options Pricing Formulas Second Edition
// by Espen Gaarder Haug

import { roundNumber } from "../index";

import { cnd } from "../distributions";

export function variableD1(
  price: number,
  strike: number,
  time: number,
  volatility: number,
  carry: number
) {
  return (
    (Math.log(price / strike) + (carry + volatility ** 2 / 2) * time) /
    (volatility * Math.sqrt(time))
  );
}

export function variableD2 (
  price: number,
  strike: number,
  time: number,
  volatility: number,
  carry: number
) {
  let d1 = variableD1(price, strike, time, volatility, carry)
  return d1 - volatility * Math.sqrt(time)
}

// section 1.1.6
export function generalBlackScholes(
  callPutflag: "Call" | "Put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  volatility: number,
  carry: number
) {
  let d1 = variableD1(price, strike, time, volatility, carry)
  let d2 =variableD2(price, strike, time, volatility, carry)

  if (callPutflag === "Call") {
    return (
      price * Math.exp((carry - rate) * time) * cnd(d1) -
      strike * Math.exp(-rate * time) * cnd(d2)
    );
  }

  // put
  return (
    strike * Math.exp(-rate * time) * cnd(-d2) -
    price * Math.exp((carry - rate) * time) * cnd(-d1)
  );
}

// algorith inspired on the binary search
// instead of having a array with items. it uses the
// real number line [0, Infinity)
// - the lower bound is 0 since volatility cant be negative
// - upperbound is infinty
// - first loop is to find better lower and upper bounds
// - second loop choose a mid point between lower and upper bound
//    and update the bound accordenly
// - a precision has a default to 4 decimal places, but could be changed.
export function generalBlackScholesIV(
  callPutflag: "Call" | "Put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  optionPrice: number,
  carry: number,
  precision = 4
) {
  // the lower bound is 0 since volatility cant be negative
  // next find the upper bound
  let lowerBound = 0;
  let upperBound = Infinity;

  let idx = 0;
  while (true) {
    let vol = 2 ** idx / 1000;
    idx++;

    let guessPrice = generalBlackScholes(
      callPutflag,
      price,
      strike,
      time,
      rate,
      vol,
      carry
    );

    guessPrice = roundNumber(guessPrice, precision);

    if (guessPrice < optionPrice) {
      lowerBound = vol;
      continue;
    }

    if (guessPrice > optionPrice) {
      upperBound = vol;
      break;
    }
  }

  while (true) {
    let vol = lowerBound + (upperBound - lowerBound) / 2;

    let guessPrice = generalBlackScholes(
      callPutflag,
      price,
      strike,
      time,
      rate,
      vol,
      carry
    );

    guessPrice = roundNumber(guessPrice, precision);

    if (guessPrice < optionPrice) {
      lowerBound = vol;
      continue;
    }

    if (guessPrice > optionPrice) {
      upperBound = vol;
      continue;
    }

    if (guessPrice === optionPrice) {
      return roundNumber(vol, precision);
    }
  }
}
