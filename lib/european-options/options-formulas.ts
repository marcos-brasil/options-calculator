// formulas taken from the book
// The Complete Guide to Options Pricing Formulas Second Edition
// by Espen Gaarder Haug

import { gDelta } from "./delta-greek";
import {
  generalBlackScholes,
  generalBlackScholesIV,
} from "./general-black-scholes";

import {
  commodity,
  commodityIV,
  currency,
  currencyIV,
  dividend,
  dividendIV,
  futures,
  futuresIV,
  vanilla,
  vanillaIV,
} from "./transforms";

//
//  Prices
//
// section 1.1.1
export const vanillaOptionPrice = vanilla(generalBlackScholes);

// section 1.1.2
export const dividendOptionPrice = dividend(generalBlackScholes);

// section 1.1.3
export const futuresOptionPrice = futures(generalBlackScholes);

// section 1.1.5
export const currencyOptionPrice = currency(generalBlackScholes);

export const commodityOptionPrice = commodity(generalBlackScholes);

//
// Implied Volatility
//

export const vanillaOptionIV = vanillaIV(generalBlackScholesIV);
export const dividendOptionIV = dividendIV(generalBlackScholesIV);
export const futuresOptionIV = futuresIV(generalBlackScholesIV);
export const currencyOptionIV = currencyIV(generalBlackScholesIV);
export const commodityOptionIV = commodityIV(generalBlackScholesIV);

//
// Delta
//

export const vanillaDelta = vanilla(gDelta)
export const futuresDelta = futures(gDelta);
export const commoditiesDelta = commodity(gDelta);
