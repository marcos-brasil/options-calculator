import { useState } from "react";
import Switch from "../elements/Switch";

import styles from "./calculator.module.css";

export default function Calculator() {
  let [optionType, setOptionType] = useState("Call");

  let legend = <div className={styles.textOptionType}>{optionType}</div>;

  return (
    <div className="flex flex-col items-center h-full w-full">
      <h1 className="flex text-xl h-fit bg-red-100">Options Calculator</h1>

      <div className="flex flex-col items-center w-full h-full p-2 bg-yellow-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("e", e);
          }}
        >
          <div className="flex justify-center pt-4 pb-6">
            <Switch
              id={optionType}
              legend={legend}
              onChange={(e) => {
                console.log(e);
                setOptionType(optionType === "Call" ? "Put" : "Call");
              }}
            />
          </div>

          <div className="flex">
            <div className="flex flex-col w-[170px] justify-end pr-2 gap-2 text-right">
              <label htmlFor="asset-symbol" className="">
                Assest Symbol
              </label>
              <label htmlFor="asset-price" className="">
                Assest Price
              </label>
              <label htmlFor="options-price" className="">
                Options Price
              </label>
              <label htmlFor="strike-price" className="">
                Strike Price
              </label>
              <label htmlFor="number-of-contracts" className="">
                Number of contracts
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Assest Symbol"
                id="asset-symbol"
                className="bg-blue-100"
              ></input>
              <input
                type="number"
                step=".01"
                placeholder="Assest Price"
                id="asset-price"
                className="bg-blue-100"
              ></input>
              <input
                type="number"
                step=".01"
                placeholder="Options Price"
                id="options-price"
                className="bg-blue-100"
              ></input>
              <input
                type="number"
                step=".01"
                placeholder="Strike Price"
                id="strike-price"
                className="bg-blue-100"
              ></input>
              <input
                type="number"
                step=".01"
                placeholder="Number of contracts"
                id="number-of-contracts"
                className="bg-blue-100"
              ></input>
            </div>
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
