type GeneralBlackScholes = (
  callPutflag: "Call" | "Put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  volatility: number,
  carry: number
) => number;

type GeneralBlackScholesIV = (
  callPutflag: "Call" | "Put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  optionPrice: number,
  carry: number,
  precision?: number
) => number;

export function vanilla(fn: GeneralBlackScholes) {
  return (
    callPutflag: "Call" | "Put",
    price: number,
    strike: number,
    time: number,
    rate: number,
    volatility: number
  ) => fn(callPutflag, price, strike, time, rate, volatility, rate);
}

export function vanillaIV(fn: GeneralBlackScholesIV) {
  return (
    callPutflag: "Call" | "Put",
    price: number,
    strike: number,
    time: number,
    rate: number,
    optionPrice: number,
    precision = 4
  ) => fn(callPutflag, price, strike, time, rate, optionPrice, rate, precision);
}

export function dividend(fn: GeneralBlackScholes) {
  return (
    callPutflag: "Call" | "Put",
    price: number,
    strike: number,
    time: number,
    rate: number,
    volatility: number,
    dividend: number
  ) => fn(callPutflag, price, strike, time, rate, volatility, rate - dividend);
}

export function dividendIV(fn: GeneralBlackScholesIV) {
  return (
    callPutflag: "Call" | "Put",
    price: number,
    strike: number,
    time: number,
    rate: number,
    optionPrice: number,
    dividend: number,
    precission = 4
  ) =>
    fn(
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

export function futures(fn: GeneralBlackScholes) {
  return (
    callPutflag: "Call" | "Put",
    exchangeRate: number,
    strike: number,
    time: number,
    rate: number,
    volatility: number
  ) => fn(callPutflag, exchangeRate, strike, time, rate, volatility, 0);
}

export function futuresIV(fn: GeneralBlackScholesIV) {
  return (
    callPutflag: "Call" | "Put",
    exchangeRate: number,
    strike: number,
    time: number,
    rate: number,
    optionPrice: number,
    precission = 4
  ) =>
    fn(
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

export function currency(fn: GeneralBlackScholes) {
  return (
    callPutflag: "Call" | "Put",
    price: number,
    strike: number,
    time: number,
    rate: number,
    volatility: number,
    foreignRate: number
  ) =>
    fn(callPutflag, price, strike, time, rate, volatility, rate - foreignRate);
}

export function currencyIV(fn: GeneralBlackScholesIV) {
  return (
    callPutflag: "Call" | "Put",
    price: number,
    strike: number,
    time: number,
    rate: number,
    optionPrice: number,
    foreignRate: number,
    precision = 4
  ) =>
    fn(
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

// commodity is equal to the generalBlackScholes formula
// here just for completeness
export function commodity(fn: GeneralBlackScholes) {
  return (
    callPutflag: "Call" | "Put",
    price: number,
    strike: number,
    time: number,
    rate: number,
    volatility: number,
    carry: number
  ) => fn(callPutflag, price, strike, time, rate, volatility, carry);
}

export function commodityIV(fn: GeneralBlackScholesIV) {
  return (
    callPutflag: "Call" | "Put",
    price: number,
    strike: number,
    time: number,
    rate: number,
    volatility: number,
    carry: number,
    precision = 4
  ) => fn(callPutflag, price, strike, time, rate, volatility, carry, precision);
}
