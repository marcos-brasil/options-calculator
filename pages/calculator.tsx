import type { MutableRefObject, ChangeEvent } from "react";
import { useState, useRef } from "react";

import { useSelector } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Switch from "../elements/Switch";
import Input from "../elements/Input";
import DateSelect from "../elements/DateSelect";

import styles from "./calculator.module.css";

import { useAppDispatch, useAppSelector, optionsSchema } from "../models";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(optionsSchema),
  });

  // throw 'eee'
  console.log("eeee", [errors.expiration]);

  let onSubmit = (data: any) => {
    console.log("---!!!", data);
  };

  // console.log('[[[[[[[', register("expiration"))

  return (
    <div className="flex flex-col items-center h-full w-full">
      <h1 className="flex text-xl h-fit w-full justify-center">
        Options Calculator
      </h1>

      <div className="flex flex-col items-center w-full h-full p-2 bg-yellow-100">
        <form
          className="flex flex-col w-full items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input className=" h-0 none"></input>
          <div className="flex justify-center pt-4 pb-8">
            <Switch
              shouldSwitch={true}
              // animate={false}
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
            {/* <DateDropdown /> */}
            <DateSelect
              register={register("expiration")}
              // {...register("expiration")}
              id="expiration"
              day={undefined}
              placeholder="Expiration"
              onChange={(val) => {
                console.log("-----AAAA", val);
              }}
            />
            <Input
              // {...register("assetPrice")}
              register={register("assetPrice")}
              id="assetPrice"
              placeholder="Assest Price"
              onChange={(e) => {
                console.log("-----", e.target.value);
              }}
            />

            <Input
              // {...register("optionsPrice")}
              register={register("optionsPrice")}
              id="optionsPrice"
              placeholder="Options Price"
              onChange={(e) => {
                console.log("-----", e.target.value);
              }}
            />

            <Input
              // {...register("strikePrice")}
              register={register("strikePrice")}
              id="strikePrice"
              placeholder="Strike Price"
              onChange={(e) => {
                console.log("-----", e.target.value);
              }}
            />

            <Input
              // {...register("numberContracts")}
              register={register("numberContracts")}
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
