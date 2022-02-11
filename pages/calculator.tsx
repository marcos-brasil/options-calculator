import { useState } from "react";
import Switch from "../elements/Switch";

import styles from "./calculator.module.css";

export default function Calculator() {
  let [optionType, setOptionType] = useState("Call");

  let legend = <div className={styles.switchText}>{optionType}</div>;

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
                console.log(e.target.value);
                setOptionType(optionType === "Call" ? "Put" : "Call");
              }}
            />
          </div>

          <div className={styles.inputContainer}>
            <div>
              <label htmlFor="asset-symbol" className="pr-2">
                Assest Symbol
              </label>
              <input
                type="text"
                placeholder="Assest Symbol"
                id="asset-symbol"
                className={styles.input}
              ></input>
            </div>
            <div>
              <label htmlFor="asset-price" className="pr-2">
                Assest Price
              </label>
              <input
                type="number"
                step=".01"
                placeholder="Assest Price"
                id="asset-price"
                className="rounded-md px-2 bg-gray-200 outline-none placeholder-gray-400 text-sm h-[24px] w-[180px]"
              ></input>
            </div>
            <div>
              <label htmlFor="options-price" className="pr-2">
                Option Price
              </label>
              <input
                type="number"
                step=".01"
                placeholder="Options Price"
                id="options-price"
                className={styles.input}
              ></input>
            </div>
            <div>
              <label htmlFor="asset-price" className="pr-2">
                Strike Price
              </label>
              <input
                type="number"
                step=".01"
                placeholder="Strike Price"
                id="strike-price"
                className={styles.input}
              ></input>
            </div>
            <div>
              <label htmlFor="asset-price" className="pr-2">
                Number of contracts
              </label>
              <input
                type="number"
                step=".01"
                placeholder="Number of contracts"
                id="number-of-contracts"
                className={styles.input}
              ></input>
            </div>

            {/* <div className="flex flex-col w-[170px] justify-end pr-2 gap-2 text-right">
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
            <div className="flex flex-col gap-2 w-[180px] pt-2 h-[24px] text-sm">
              <input
                type="text"
                placeholder="Assest Symbol"
                id="asset-symbol"
                className="rounded-md px-2 bg-gray-200 outline-none placeholder-gray-400"
              ></input>
              <input
                type="number"
                step=".01"
                placeholder="Assest Price"
                id="asset-price"
                className="rounded-md px-2 bg-gray-200 outline-none"
              ></input>
              <input
                type="number"
                step=".01"
                placeholder="Options Price"
                id="options-price"
                className="rounded-md px-2 bg-gray-200 outline-none"
              ></input>
              <input
                type="number"
                step=".01"
                placeholder="Strike Price"
                id="strike-price"
                className="rounded-md px-2 bg-gray-200 outline-none"
              ></input>
              <input
                type="number"
                step=".01"
                placeholder="Number of contracts"
                id="number-of-contracts"
                className="rounded-md px-2 bg-gray-200 outline-none  focus:text-red-700"
              ></input>
            </div> */}
          </div>

          <div className="flex justify-end pt-10">
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
