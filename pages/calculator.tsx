import { MutableRefObject, ChangeEvent, useEffect } from "react";
import { useState, useRef } from "react";

import { useSelector } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";

import Switch from "../elements/Switch";
import Input from "../elements/Input";
import DateSelect from "../elements/DateSelect";

import styles from "./calculator.module.css";

import { useAppDispatch, useAppSelector, optionsSchema } from "../models";
import {
  updateAssetPrice,
  updateNumberContracts,
  updateExpiration,
  updateKind,
  updateOptionPrice,
  updateStrikePrice,
  updateInterestRate
} from "../models/options";

// type Form

async function postForm(url: string, opt: RequestInit): Promise<unknown> {
  return fetch(url, opt).then((res) => res.json() as Promise<unknown>);
}

export default function Calculator() {
  let dispatch = useAppDispatch();

  let optionState = useAppSelector((state) => state.option);

  let legend = <div className={styles.switchText}>{optionState.kind}</div>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(optionsSchema),
  });

  console.log("errors", errors);

  // console.log('redux', optionState.expiration)

  let onSubmit = async () => {
    // console.log("submit", data);
    let res = await postForm("/api/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(optionState),
    });

    console.log(res);
  };

  // setTimeout(() => {
  //   onSubmit();
  // }, 1000);

  //

  let registers = {
    kind: register("kind"),
    expiration: register("expiration"),
    assetPrice: register("assetPrice"),
    optionPrice: register("optionPrice"),
    strikePrice: register("strikePrice"),
    numberContracts: register("numberContracts"),
    interestRate: register("interestRate"),
  };

  let { optionPriceEl, strikePriceEl, numberContractsEl, interestRateEl } =
    useHTMLInput(registers);

  let submitButtonRef = useRef<HTMLButtonElement>();

  let expirationDate = optionState.expiration.split("-") as [
    string,
    string,
    string
  ];

  let formSubmit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col items-center h-full w-full">
      <h1 className="flex text-2xl h-fit w-full justify-center">
        Options Calculator
      </h1>

      <div className="flex flex-col items-center w-full h-full p-2 bg-yellow-100">
        <form
          className="flex flex-col w-full items-center"
          // onSubmit={}
        >
          <input className=" h-0 none"></input>
          <div className="flex justify-center pt-4 pb-8">
            <Switch
              register={registers.kind}
              isChecked={optionState.kind === "Put"}
              id={optionState.kind}
              legend={legend}
              onClick={(e) => {
                let kind = optionState.kind === "Call" ? "Put" : "Call";
                dispatch(updateKind(kind));
              }}
            />
          </div>

          <div className={styles.inputContainer}>
            <DateSelect
              register={registers.expiration}
              id="expiration"
              year={expirationDate[0]}
              month={expirationDate[1]}
              day={expirationDate[2]}
              placeholder="Expiration"
              onChange={(val) => {
                // console.log('******')
                dispatch(updateExpiration(val));
              }}
            />
            <Input
              value={optionState.assetPrice}
              register={registers.assetPrice}
              id="assetPrice"
              placeholder="Assest Price"
              onChange={(e) => {
                let val = (e.target as HTMLInputElement).value;
                dispatch(updateAssetPrice(val));
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (optionPriceEl) {
                    optionPriceEl.focus();
                  }

                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            />
            <Input
              value={optionState.optionPrice}
              register={registers.optionPrice}
              id="optionPrice"
              placeholder="Options Price"
              onChange={(e) => {
                let val = (e.target as HTMLInputElement).value;
                dispatch(updateOptionPrice(val));
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (strikePriceEl) {
                    strikePriceEl.focus();
                  }

                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            />

            <Input
              value={optionState.strikePrice}
              register={registers.strikePrice}
              id="strikePrice"
              placeholder="Strike Price"
              onChange={(e) => {
                let val = (e.target as HTMLInputElement).value;
                dispatch(updateStrikePrice(val));
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (numberContractsEl) {
                    numberContractsEl.focus();
                  }

                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            />

            <Input
              value={optionState.numberContracts}
              register={registers.numberContracts}
              id="numberContracts"
              placeholder="Number of contracts"
              onChange={(e) => {
                let val = (e.target as HTMLInputElement).value;
                dispatch(updateNumberContracts(val));
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {

                  if (interestRateEl) {
                    interestRateEl.focus();
                  }

            

                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            />
            <Input
              value={optionState.interestRate}
              register={registers.interestRate}
              id="interestRate"
              placeholder="Interest Rate"
              onChange={(e) => {
                let val = (e.target as HTMLInputElement).value;
                dispatch(updateInterestRate(val));
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (submitButtonRef.current) {
                    submitButtonRef.current.focus();
                    submitButtonRef.current.click();
                    submitButtonRef.current.blur();

                  }

                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            />
          </div>

          <div className=" flex justify-end pt-10 ">
            <button
              ref={submitButtonRef as MutableRefObject<HTMLButtonElement>}
              className=" rounded-full bg-gray-200 hover:bg-blue-200 px-4 py-1 outline-0 "
              // type="submit"
              onClick={formSubmit}
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type Registers = {
  optionPrice: UseFormRegisterReturn;
  strikePrice: UseFormRegisterReturn;
  numberContracts: UseFormRegisterReturn;
  kind: UseFormRegisterReturn;
  interestRate: UseFormRegisterReturn;
};

function useHTMLInput(registers: Registers) {
  let [optionPriceEl, setOptionPriceEl] = useState<HTMLInputElement>();
  let [strikePriceEl, setStrikePriceEl] = useState<HTMLInputElement>();
  let [numberContractsEl, setNumberContractsPriceEl] =
    useState<HTMLInputElement>();

  let [kindsEl, setKindsEl] = useState<HTMLInputElement>();
  let [interestRateEl, setInterestRateEl] = useState<HTMLInputElement>();

  let optionPriceRef = registers.optionPrice.ref;
  let strikePriceRef = registers.strikePrice.ref;
  let numberContractsRef = registers.numberContracts.ref;
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

  registers.numberContracts.ref = (el: HTMLInputElement) => {
    setNumberContractsPriceEl(el);
    return numberContractsRef(el);
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
    numberContractsEl,
    kindsEl,
    interestRateEl,
  };
}
