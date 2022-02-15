import type { MutableRefObject } from "react";
import { useState, useRef, useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";

import { useAppDispatch, useAppSelector, optionsSchema } from "../../models";
import {
  updateAssetPrice,
  updateExpiration,
  updateKind,
  updateOptionPrice,
  updateStrikePrice,
  updateInterestRate,
} from "../../models/options";

import Switch from "../../elements/Switch";
import Input from "../../elements/Input";
import DateSelect from "../../elements/DateSelect";

import styles from "./index.module.css";
import { useHTMLInputs } from "./hooks";

async function postForm(url: string, opt: RequestInit): Promise<unknown> {
  return fetch(url, opt).then((res) => res.json() as Promise<unknown>);
}

export default function FormFields() {
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

  console.log('errors', errors)


  let onSubmit = async () => {
    let res = await postForm("/api/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(optionState),
    });

    console.log(res);
  };

  let formRegisters = {
    kind: register("kind"),
    expiration: register("expiration"),
    assetPrice: register("assetPrice"),
    optionPrice: register("optionPrice"),
    strikePrice: register("strikePrice"),
    interestRate: register("interestRate"),
  };

  let { optionPriceEl, strikePriceEl, interestRateEl } =
    useHTMLInputs(formRegisters);

  let submitButtonRef = useRef<HTMLButtonElement>();

  let expirationDate = optionState.expiration.split("-") as [
    string,
    string,
    string
  ];

  let formSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className={styles.formContainer}>
      <div className={styles.switchContainer}>
        <Switch
          register={formRegisters.kind}
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
          register={formRegisters.expiration}
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
          register={formRegisters.assetPrice}
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
          register={formRegisters.optionPrice}
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
          register={formRegisters.strikePrice}
          id="strikePrice"
          placeholder="Strike Price"
          onChange={(e) => {
            let val = (e.target as HTMLInputElement).value;
            dispatch(updateStrikePrice(val));
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
          register={formRegisters.interestRate}
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
          className={styles.button}
          onClick={formSubmit}
        >
          Calculate
        </button>
      </div>
    </form>
  );
}

{
  /* <Input
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
            /> */
}
