import type { ChangeEvent, KeyboardEvent } from "react";
import styles from "./index.module.css";

import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  // nextInput?: HTMLInputElement;
  register: UseFormRegisterReturn;
  placeholder: string;
  id: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (evt: KeyboardEvent<HTMLInputElement>) => void
};

export default function Input({
  onKeyPress,
  placeholder,
  id,
  onChange,
  register,
}: Props) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {placeholder}
      </label>
      <input
        {...register}
        autoComplete="off"
        type="text"
        // step=".01"
        placeholder={placeholder}
        id={id}
        className={styles.input}
        onChange={onChange}
        onKeyPress={onKeyPress}
        // onKeyPress={(e) => {
        //   if (e.key === "Enter") {
        //     // console.log(placeholder, [e], [nextInput]);
        //     if (nextInput) {
        //       nextInput.focus();
        //     }
        //     e.preventDefault();
        //     e.stopPropagation();
        //   }
        // }}
      ></input>
    </div>
  );
}

/*
    dob: Yup.string()
            .required('Date of Birth is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
            */
