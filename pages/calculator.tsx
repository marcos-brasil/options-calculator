import type { MutableRefObject, ChangeEvent } from "react";
import { useState, useRef } from "react";

import { useSelector } from "react-redux";

import Switch from "../elements/Switch";
import Input from "../elements/Input";
import DateSelect from "../elements/DateSelect";

import styles from "./calculator.module.css";

import { useAppDispatch, useAppSelector } from "../stores";

function handleOnChangeInput(e: ChangeEvent<HTMLInputElement>) {
  console.log([e.target.id], e.target.value);
}

export default function Calculator() {
  let optionState = useAppSelector((state) => state.option);

  let [optionType, setOptionType] = useState("Call");

  let legend = <div className={styles.switchText}>{optionType}</div>;

  let date = new Date();
  let minDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  console.log(minDate, date.toLocaleDateString());

  // throw 'eee'

  return (
    <div className="flex flex-col items-center h-full w-full">
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
          <input className=" h-0 none"></input>
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
            <DateSelect
              id="expiration"
              placeholder="Expiration"
              onChange={(e) => {
                console.log("-----", e.target.value);
              }}
            />
            <Input
              id="assetPrice"
              placeholder="Assest Price"
              onChange={(e) => {
                console.log("-----", e.target.value);
              }}
            />

            <Input
              id="optionsPrice"
              placeholder="Options Price"
              onChange={(e) => {
                console.log("-----", e.target.value);
              }}
            />
            {/* <div className="flex flex-col xs:flex-row">
              <label htmlFor="expiration" className="pr-2">
                Expiration
              </label>
              <select
                className={styles.select}
                placeholder="year"
                defaultValue={"month"}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              >
                <option className="text-gray-600">2022</option>
              </select>
            </div> */}
            <Input
              id="strikePrice"
              placeholder="Strike Price"
              onChange={(e) => {
                console.log("-----", e.target.value);
              }}
            />

            <Input
              id="numberContracts"
              placeholder="Number of contracts"
              onChange={(e) => {
                console.log("-----", e.target.value);
              }}
            />
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
