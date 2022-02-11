import { useState } from "react";
import Switch from "../elements/Switch";

import styles from "./calculator.module.css";

export default function Calculator() {
  let [optionType, setOptionType] = useState("Call");

  let legend = <div className={styles.textOptionType}>{optionType}</div>;

  return (
    <div className="flex flex-col h-full w-full">
      <h1 className="flex text-xl h-fit bg-red-100">Options Calculator</h1>

      <div className="flex flex-col w-full h-full p-2 bg-yellow-100">
        <Switch
          legend={legend}
          onChange={() => {
            setOptionType(optionType === "Call" ? "Put" : "Call");
          }}
        />

        <div className="flex">form</div>
      </div>
    </div>
  );
}
