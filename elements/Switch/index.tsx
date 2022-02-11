import type { ChangeEvent } from "react";
import styles from "./index.module.css";

type Props = {
  id: string;
  legend: JSX.Element;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  switchClass?: string;
};

export default function Switch({ id, legend, onChange, switchClass }: Props) {
  return (
    <>
      <label htmlFor={id} className={styles.toggle}>
        <input name={id} id={id} type="checkbox" onChange={onChange}></input>
        <span className={styles.slider}></span>
      </label>
      {legend}
    </>
  );
}
