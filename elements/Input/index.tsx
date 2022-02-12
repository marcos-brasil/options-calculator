import type { ChangeEvent } from "react";
import styles from "./index.module.css";

type Props = {
  placeholder: string;
  id: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ placeholder, id, onChange }: Props) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {placeholder}
      </label>
      <input
        type="text"
        // step=".01"
        placeholder={placeholder}
        id={id}
        className={styles.input}
        onChange={onChange}
      ></input>
    </div>
  );
}
