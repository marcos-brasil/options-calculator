import type { ChangeEvent } from "react";
import { useState } from "react";
import Switch from "../elements/Switch";

import styles from "./calculator.module.css";

function handleOnChangeInput(e: ChangeEvent<HTMLInputElement>) {
  console.log([e.target.id], e.target.value);
}

export default function Calculator() {
  let [optionType, setOptionType] = useState("Call");

  let legend = <div className={styles.switchText}>{optionType}</div>;

  let date = new Date();
  let minDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  console.log(minDate, date.toLocaleDateString());

  return (
    <div className="flex flex-col items-center h-full w-full">
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 0;
        }

        

        // input[type="date"] {
        //   display:flex;
        //   flex-direction: col;
        //   display:-webkit-flex;
        //   -webkit-flex: 1 0 0;
        // }
      `}</style>

      <h1 className="flex text-xl h-fit w-full justify-center">
        Options Calculator
      </h1>

      <div className="flex flex-col items-center w-full h-full p-2 bg-yellow-100">
        <form
          className="flex flex-col w-full items-center"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("e", e);
          }}
        >
          <div className="flex justify-center pt-4 pb-8">
            <Switch
              id={optionType}
              legend={legend}
              onChange={(e) => {
                console.log(e.target.value);
                setOptionType(optionType === "Call" ? "Put" : "Call");
              }}
            />
          </div>

          <div className={styles.inputContainer}>
            {/* <div>
              <label htmlFor="asset-symbol" className="pr-2">
                Assest Symbol
              </label>
              <input
                type="text"
                placeholder="Assest Symbol"
                id="asset-symbol"
                className={styles.input}
              ></input>
            </div> */}
            <div className="flex flex-col  xs:flex-row">
              <label htmlFor="assetPrice" className="pr-2">
                Assest Price
              </label>
              <input
                type="number"
                step=".01"
                placeholder="Assest Price"
                id="assetPrice"
                className={styles.input}
                onChange={handleOnChangeInput}
              ></input>
            </div>
            <div className="flex flex-col xs:flex-row">
              <label htmlFor="expiration" className="pr-2">
                Expiration
              </label>
              <input
                type="text"
                // step=".01"
                // placeholder="2022/15/07"
                min={minDate}
                max="2030-12-31"
                placeholder="YYYY-MM-DD"
                // title="FFFF"
                id="expiration"
                className={styles.input}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                onChange={handleOnChangeInput}
              ></input>
            </div>
            <div className="flex flex-col  xs:flex-row">
              <label htmlFor="optionsPrice" className="pr-2">
                Option Price
              </label>
              <input
                type="number"
                step=".01"
                placeholder="Options Price"
                id="optionsPrice"
                className={styles.input}
                onChange={handleOnChangeInput}
              ></input>
            </div>
            <div className="flex flex-col xs:flex-row">
              <label htmlFor="strikePrice" className="pr-2">
                Strike Price
              </label>
              <input
                type="number"
                step=".01"
                placeholder="Strike Price"
                id="strikePrice"
                className={styles.input}
                onChange={handleOnChangeInput}
              ></input>
            </div>
            <div className="flex flex-col  xs:flex-row">
              <label htmlFor="numberContracts" className="pr-2">
                Number of contracts
              </label>
              <input
                type="number"
                step=".01"
                placeholder="Number of contracts"
                id="numberContracts"
                className={styles.input}
                onChange={handleOnChangeInput}
              ></input>
            </div>
          </div>

          <div className=" flex justify-end pt-10 ">
            <button
              className=" rounded-full bg-gray-200 hover:bg-blue-200 px-4 py-1"
              type="submit"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
