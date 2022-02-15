import { MutableRefObject, ChangeEvent, useEffect } from "react";
import { useState, useRef } from "react";

import { useSelector } from "react-redux";

import EuropeanFormFields from "../../components/EuropeanOptionForm";
import StatsTable from "../../elements/StatsTable";

import styles from "./index.module.css";

export default function Calculator() {
  return (
    <div className={styles.container}>
      <h1 className="flex text-2xl h-fit w-full justify-center italic text-center">
        European Options Calculator
      </h1>

      <div className="pt-4 w-5/6 border-b border-gray-400"></div>

      <div className=" w-full h-full p-2 ">
        <EuropeanFormFields />
        <div className="flex  overflow-auto gap-2">
          <StatsTable
            title="Vanila Greeks"
            data={[
              { legend: "Implied Volatility", value: "20%" },
              { legend: "deltay", value: "45" },
              { legend: "gamma", value: "20" },
              { legend: "theta", value: "4.6" },
              { legend: "vega", value: "4" },
            ]}
          />
          <StatsTable
            title="Vanila Greeks"
            data={[
              { legend: "Implied Volatility", value: "20%" },
              { legend: "deltay", value: "45" },
              { legend: "gamma", value: "20" },
              { legend: "theta", value: "4.6" },
              { legend: "vega", value: "4" },
            ]}
          />
          <StatsTable
            title="Vanila Greeks"
            data={[
              { legend: "Implied Volatility", value: "20%" },
              { legend: "deltay", value: "45" },
              { legend: "gamma", value: "20" },
              { legend: "theta", value: "4.6" },
              { legend: "vega", value: "4" },
            ]}
          />
          <StatsTable
            title="Vanila Greeks"
            data={[
              { legend: "Implied Volatility", value: "20%" },
              { legend: "deltay", value: "45" },
              { legend: "gamma", value: "20" },
              { legend: "theta", value: "4.6" },
              { legend: "vega", value: "4" },
            ]}
          />
          <StatsTable
            title="Vanila Greeks"
            data={[
              { legend: "Implied Volatility", value: "20%" },
              { legend: "deltay", value: "45" },
              { legend: "gamma", value: "20" },
              { legend: "theta", value: "4.6" },
              { legend: "vega", value: "4" },
            ]}
          />
                    <StatsTable
            title="Vanila Greeks"
            data={[
              { legend: "Implied Volatility", value: "20%" },
              { legend: "deltay", value: "45" },
              { legend: "gamma", value: "20" },
              { legend: "theta", value: "4.6" },
              { legend: "vega", value: "4" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
