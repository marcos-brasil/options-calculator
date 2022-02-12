import type { ChangeEvent } from "react";
import styles from "./index.module.css";

import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
  placeholder: string;
  id: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ placeholder, id, onChange, register }: Props) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {placeholder}
      </label>
      <input
        {...register}
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

/*
    dob: Yup.string()
            .required('Date of Birth is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
            */