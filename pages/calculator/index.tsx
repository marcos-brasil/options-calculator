import { MutableRefObject, ChangeEvent, useEffect } from "react";
import { useState, useRef } from "react";

import { useSelector } from "react-redux";

import EuropeanFormFields from "../../components/EuropeanOptionForm";

import styles from "./index.module.css";

export default function Calculator() {
  return (
    <div className="flex flex-col items-center h-full w-full  rounded-lg pt-10 shadow-2xl border border-gray-300  text-gray-700">
      <h1 className="flex text-2xl h-fit w-full justify-center">
        European Options Calculator
      </h1>

      <div className="flex flex-col items-center w-full h-full p-2 ">
        <EuropeanFormFields />
      </div>
    </div>
  );
}
