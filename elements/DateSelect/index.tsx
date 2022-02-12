import type { ChangeEvent } from "react";
import styles from "./index.module.css";

type Props = {
  placeholder: string;
  id: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export default function DateSelect({ placeholder, id, onChange }: Props) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col xs:flex-row gap-2 ml-[84px] pb-1">
          <div className="flex w-1"></div>
          <div className="flex w-fit h-fit pr-6">year</div>
          <div className="flex w-fit h-fit pr-3">month</div>
          <div className="flex w-fit h-fit pr-0">day</div>
        </div>
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
      </div>
    </>
  );
}
