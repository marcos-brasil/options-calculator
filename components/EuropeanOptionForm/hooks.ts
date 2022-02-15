import { useState } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

export type Registers = {
  optionPrice: UseFormRegisterReturn;
  strikePrice: UseFormRegisterReturn;
  kind: UseFormRegisterReturn;
  interestRate: UseFormRegisterReturn;
};

export function useHTMLInputs(registers: Registers) {
  let [optionPriceEl, setOptionPriceEl] = useState<HTMLInputElement>();
  let [strikePriceEl, setStrikePriceEl] = useState<HTMLInputElement>();

  let [kindsEl, setKindsEl] = useState<HTMLInputElement>();
  let [interestRateEl, setInterestRateEl] = useState<HTMLInputElement>();

  let optionPriceRef = registers.optionPrice.ref;
  let strikePriceRef = registers.strikePrice.ref;
  let kindRef = registers.kind.ref;
  let interestRate = registers.interestRate.ref;

  registers.optionPrice.ref = (el: HTMLInputElement) => {
    setOptionPriceEl(el);
    return optionPriceRef(el);
  };

  registers.strikePrice.ref = (el: HTMLInputElement) => {
    setStrikePriceEl(el);
    return strikePriceRef(el);
  };

  registers.kind.ref = (el: HTMLInputElement) => {
    setKindsEl(el);
    return kindRef(el);
  };

  registers.interestRate.ref = (el: HTMLInputElement) => {
    setInterestRateEl(el);
    return interestRate(el);
  };

  return {
    optionPriceEl,
    strikePriceEl,
    kindsEl,
    interestRateEl,
  };
}
