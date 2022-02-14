// // import test from 'ava'
// let test = require("ava");
import { roundNumber } from "../index";
import {
  simpleEuropeanOption,
  dividendEuropeanOption,
  currencyEuropeanOption,
  futuresEuropeanOption,
  //
  simpleEuropeanOptionIV,
  dividendEuropeanOptionIV,
  futuresEuropeanOptionIV,
  currencyEuropeanOptionIV,
} from "./options-formulas";

describe("european options", () => {
  describe("compute prices of several options types", () => {
    test("vanila call option", () => {
      let callPrice = simpleEuropeanOption("call", 60, 65, 0.25, 0.08, 0.3);

      expect(roundNumber(callPrice, 4)).toBe(2.1334);
    });

    test("dividend put option", () => {
      let putPrice = dividendEuropeanOption(
        "put",
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
      let putPrice = futuresEuropeanOption("call", 19, 19, 0.75, 0.1, 0.28);

      expect(roundNumber(putPrice, 4)).toBe(1.7011);
    });

    test("futures put option", () => {
      let putPrice = futuresEuropeanOption("put", 19, 19, 0.75, 0.1, 0.28);

      expect(roundNumber(putPrice, 4)).toBe(1.7011);
    });

    test("currency call option", () => {
      let putPrice = currencyEuropeanOption(
        "call",
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
      let vol = simpleEuropeanOptionIV("call", 60, 65, 0.25, 0.08, 2.1334);
      expect(vol).toBe(0.3);
    });

    test("dividend put option", () => {
      let vol = dividendEuropeanOptionIV(
        "put",
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
      let vol = futuresEuropeanOptionIV("call", 19, 19, 0.75, 0.1, 1.7011);
      expect(vol).toBe(0.28);
    });

    test("futures put option", () => {
      let vol = futuresEuropeanOptionIV("put", 19, 19, 0.75, 0.1, 1.7011);
      expect(vol).toBe(0.28);
    });

    test("currency call option", () => {
      let vol = currencyEuropeanOptionIV(
        "call",
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
});
