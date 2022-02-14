// formulas taken from the book
// The Complete Guide to Options Pricing Formulas Second Edition
// by Espen Gaarder Haug 

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

// the cumulative normal distribution function
// section 13.1.1
export function cnd(x: number) {
  let y = Math.abs(x);

  let cnd = undefined;
  let sumA = undefined;
  let sumB = undefined;

  if (y > 37) {
    cnd = 0;
  } else {
    let exponential = Math.exp(-(y ** 2) / 2);
    // let exponential = Math.pow(Math.E, Math.pow(-y, 2)/2)

    if (y < 7.07106781186547) {
      sumA = 0.0352624965998911 * y + 0.700383064443688;
      sumA = sumA * y + 6.37396220353165;
      sumA = sumA * y + 33.912866078383;
      sumA = sumA * y + 112.079291497871;
      sumA = sumA * y + 221.213596169931;
      sumA = sumA * y + 220.206867912376;
      sumB = 0.0883883476483184 * y + 1.75566716318264;
      sumB = sumB * y + 16.064177579207;
      sumB = sumB * y + 86.7807322029461;
      sumB = sumB * y + 296.564248779674;
      sumB = sumB * y + 637.333633378831;
      sumB = sumB * y + 793.826512519948;
      sumB = sumB * y + 440.413735824752;
      cnd = (exponential * sumA) / sumB;
    } else {
      sumA = y + 0.65;
      sumA = y + 4 / sumA;
      sumA = y + 3 / sumA;
      sumA = y + 2 / sumA;
      sumA = y + 1 / sumA;
      cnd = exponential / (sumA * 2.506628274631);
    }
  }

  if (x > 0) {
    return 1 - cnd;
  }

  return cnd;
}
