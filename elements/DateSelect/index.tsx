import type { ChangeEvent } from "react";
import styles from "./index.module.css";

type Props = {
  placeholder: string;
  id: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export default function DateSelect({ placeholder, id, onChange }: Props) {
  return (
    <div className="flex flex-col xs:flex-row">
      <label htmlFor="expiration" className="flex pr-2">
        Expiration
      </label>
      <div className="">
        <select
          className={styles.select}
          placeholder="year"
          defaultValue={"month"}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          <option>2022</option>
        </select>
      </div>

      <div className="flex justify-end pl-2 w-14">
        <select
          className={styles.select}
          placeholder="year"
          defaultValue={"month"}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          <option className="">2</option>
        </select>
      </div>

      <div className="flex justify-end w-14">
        <select
          className={styles.select}
          placeholder="year"
          defaultValue={"month"}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          <option>1</option>
        </select>
      </div>
    </div>
  );
}
