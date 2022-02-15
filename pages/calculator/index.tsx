import { MutableRefObject, ChangeEvent, useEffect } from "react";
import { useState, useRef } from "react";

import { useSelector } from "react-redux";

import EuropeanFormFields from "../../components/EuropeanOptionForm";
import Card from "../../elements/Card";
import StatsTable from "../../elements/StatsTable";
import { useAppSelector } from "../../models";

import styles from "./index.module.css";

export default function Calculator() {
  let optionsGreekState = useAppSelector((state) => state.optionGreeks);

  let entries = Object.entries(optionsGreekState);

  return (
    <Card>
        <h1 className="flex text-2xl h-fit w-full justify-center italic text-center">
          European Options Calculator
        </h1>

        <div className="pt-4 w-5/6 border-b border-gray-400"></div>

        <div className=" w-full h-full p-2 ">
          <EuropeanFormFields />
          <div className="flex  overflow-auto gap-6 pt-6 mx-4">
            {entries.map(([title, data], idx) => {
              return <StatsTable key={idx} title={title} data={data} />;
            })}
          </div>
        </div>
    </Card>
  );
}
