// // import test from 'ava'
// let test = require("ava");
import { roundNumber } from "../index";
import {
  vanillaOptionPrice,
  dividendOptionPrice,
  currencyOptionPrice,
  futuresOptionPrice,
  //
  vanillaOptionIV,
  dividendOptionIV,
  futuresOptionIV,
  currencyOptionIV,
  futuresDelta,
  commoditiesDelta,
} from "./options-formulas";

describe("european options", () => {
  describe("compute prices of several options types", () => {
    test("vanila call option", () => {
      let callPrice = vanillaOptionPrice("Call", 60, 65, 0.25, 0.08, 0.3);

      expect(roundNumber(callPrice, 4)).toBe(2.1334);
    });

    test("dividend put option", () => {
      let putPrice = dividendOptionPrice(
        "Put",
        100,
        95,
        0.5,
        0.1,
        0.2,
        0.05
      );

      expect(roundNumber(putPrice, 4)).toBe(2.4648);
    });

    test("futures call option", () => {
      let putPrice = futuresOptionPrice("Call", 19, 19, 0.75, 0.1, 0.28);

      expect(roundNumber(putPrice, 4)).toBe(1.7011);
    });

    test("futures put option", () => {
      let putPrice = futuresOptionPrice("Put", 19, 19, 0.75, 0.1, 0.28);

      expect(roundNumber(putPrice, 4)).toBe(1.7011);
    });

    test("currency call option", () => {
      let putPrice = currencyOptionPrice(
        "Call",
        1.56,
        1.6,
        0.5,
        0.06,
        0.12,
        0.08
      );

      expect(roundNumber(putPrice, 4)).toBe(0.0291);
    });
  });

  describe("compute IV of several options types", () => {
    test("vanilla call option", () => {
      let vol = vanillaOptionIV("Call", 60, 65, 0.25, 0.08, 2.1334);
      expect(vol).toBe(0.3);
    });

    test("dividend put option", () => {
      let vol = dividendOptionIV(
        "Put",
        100,
        95,
        0.5,
        0.1,
        2.4648,
        0.05
      );
      expect(vol).toBe(0.2);
    });

    test("futures call option", () => {
      let vol = futuresOptionIV("Call", 19, 19, 0.75, 0.1, 1.7011);
      expect(vol).toBe(0.28);
    });

    test("futures put option", () => {
      let vol = futuresOptionIV("Put", 19, 19, 0.75, 0.1, 1.7011);
      expect(vol).toBe(0.28);
    });

    test("currency call option", () => {
      let vol = currencyOptionIV(
        "Call",
        1.56,
        1.6,
        0.5,
        0.06,
        0.0291,
        0.08
      );
      expect(vol).toBe(0.12);
    });
  });

  describe("compute delta", () => {
    test("futures call delta", () => {
      let delta = futuresDelta('Call', 105, 100, 0.5, 0.1, 0.36)
      expect(roundNumber(delta, 4)).toBe(0.5946)
    })

    test('futures put delta', () => {
      let delta = futuresDelta('Put', 105, 100, 0.5, 0.1, 0.36)
      expect(roundNumber(delta, 4)).toBe(-0.3566)
    })

    test('deep in the money commodities call with cost of carry > interest rate implies delta > 1', () => {
      let delta = commoditiesDelta('Call', 90, 40, 2, 0.03, 0.2, 0.09)
      expect(roundNumber(delta, 4)).toBe(1.1273)

    })
  })
});
