import { useEffect, useRef } from "react";
import type { MouseEvent, MutableRefObject } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import styles from "./index.module.css";

type Props = {
  id: string;
  register: UseFormRegisterReturn;
  isChecked: boolean;
  legend: JSX.Element;
  onClick: (evt: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
};

export default function Switch({
  id,
  legend,
  onClick,
  register,
  isChecked,
}: Props) {
  let r = useRef<HTMLLabelElement>() as MutableRefObject<HTMLLabelElement>;

  let inputRef = (el: HTMLInputElement) => {
    if (el) {
      el.checked = isChecked;
    }

    return register.ref(el);
  };

  return (
    <>
      <label ref={r} htmlFor={id} className={styles.toggle}>
        <input
          {...register}
          ref={inputRef}
          className="appearance-none"
          name={id}
          id={id}
          type="checkbox"
          onClick={onClick}
        ></input>
        <span className={styles.slider}></span>
      </label>
      {legend}
    </>
  );
}
