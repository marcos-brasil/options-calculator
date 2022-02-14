// formulas taken from the book
// The Complete Guide to Options Pricing Formulas Second Edition
// by Espen Gaarder Haug

import { roundNumber } from "../index";

import { cnd } from "../distributions";

// section 1.1.6
export function generalBlackScholes(
  callPutflag: "call" | "put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  volatility: number,
  carry: number
) {
  let d1 =
    (Math.log(price / strike) + (carry + volatility ** 2 / 2) * time) /
    (volatility * Math.sqrt(time));

  let d2 = d1 - volatility * Math.sqrt(time);

  if (callPutflag === "call") {
    return (
      price * Math.E ** ((carry - rate) * time) * cnd(d1) -
      strike * Math.E ** (-rate * time) * cnd(d2)
    );
  }

  // put
  return (
    strike * Math.E ** (-rate * time) * cnd(-d2) -
    price * Math.E ** ((carry - rate) * time) * cnd(-d1)
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
  callPutflag: "call" | "put",
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
    let vol = roundNumber(
      lowerBound + (upperBound - lowerBound) / 2,
      precision
    );

    let guessPrice = generalBlackScholes(
      callPutflag,
      price,
      strike,
      time,
      rate,
      vol,
      carry
    );

    guessPrice = roundNumber(guessPrice, 4);

    if (guessPrice < optionPrice) {
      lowerBound = vol;
      continue;
    }

    if (guessPrice > optionPrice) {
      upperBound = vol;
      continue;
    }

    if (guessPrice === optionPrice) {
      return vol;
    }
  }
}
