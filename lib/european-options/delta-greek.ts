// legend from VBA formulas
// S = price
// X = strike
// T = time (to expiration in years)
// r = rate (interest rate per year)
// b = carry (it can be different things if is vanila/futures/currency option)
// v = volatility (we gonna use the IV instead)

import { cnd } from '../distributions'
import {variableD1} from './general-black-scholes'



// 2.1.1
export function gDelta(
  callPutflag: "Call" | "Put",
  price: number,
  strike: number,
  time: number,
  rate: number,
  volatility: number,
  carry: number
) {
  let d1 = variableD1(price, strike, time, volatility, carry)

  if (callPutflag === "Call") {
    return Math.exp((carry - rate) * time) * cnd(d1)
  }

  return -Math.exp((carry - rate) * time) * cnd(-d1)
}


