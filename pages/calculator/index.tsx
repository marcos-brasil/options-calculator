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

      <div className=" w-full h-full p-2 ">
        <EuropeanFormFields />
        <div className="flex  flex-col w-[220px] h-[140px] pt-4">
          <div className="z-10 font-bold text-left pl-6 w-full h-ful bg-stone-200">Vanila Greeks</div>
          <div className="pl-4  overflow-auto">
            <table className="w-full  border border-gray-400">
              {/* <caption className=" font-bold text-left pl-2">
              Vanila Greeks
            </caption> */}

              <tbody className="border border-gray-400">
                <tr className="border border-gray-400">
                  <td className="border border-gray-400 w-[50px] text-right pr-2">
                    AA
                  </td>
                  <td className="pl-2">BB</td>
                </tr>
                <tr>
                  <td>AA</td>
                </tr>
                <tr>
                  <td>AA</td>
                </tr>
                <tr>
                  <td>AA</td>
                </tr>
                <tr>
                  <td>AA</td>
                </tr>
                <tr>
                  <td>AA</td>
                </tr>
                <tr>
                  <td>AA</td>
                </tr>
                <tr>
                  <td>AA</td>
                </tr>
                <tr>
                  <td>AA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
