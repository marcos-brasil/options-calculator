import { useEffect, useRef, useState } from "react";
import type { MouseEvent, MutableRefObject } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import styles from "./index.module.css";

type Props = {
  id: string;
  register: UseFormRegisterReturn;
  isChecked: boolean;
  greeLegend: string;
  redLegend: string;
  onClick: (evt: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
};

export default function Switch({
  id,
  greeLegend,
  redLegend,
  onClick,
  register,
  isChecked,
}: Props) {
  let r = useRef<HTMLLabelElement>() as MutableRefObject<HTMLLabelElement>;

  let [changeLegend, setChangeLegend] = useState(isChecked)

  let inputRef = (el: HTMLInputElement) => {
    if (el) {
      el.checked = isChecked;
    }

    return register.ref(el);
  };

  useEffect (() => {

    if (isChecked === false) {
      setTimeout(() => {
        setChangeLegend(false)
      }, 300)
      return
    }

    setTimeout(() => {
      setChangeLegend(true)
    }, 300)

  }, [isChecked])

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
      {/* <div
          className={
            isChecked
              ? styles.switchTextVisible
              : styles.switchTextVisibleTransparent
          }
        >
          {redLegend}
        </div> */}
      {changeLegend ? (
        <div
          className={
            isChecked
              ? styles.switchTextVisible
              : styles.switchTextVisibleTransparent
          }
        >
          {redLegend}
        </div>
      ) : (
        <div
          className={
            isChecked
              ? styles.switchTextVisibleTransparent
              : styles.switchTextVisible
          }
        >
          {greeLegend}
        </div>
      )}
    </>
  );
}

// function useTextAnimation(delay: number, duration: number) {

//   let initTime = Date.now()
//   let animation = () => {

//   }

//   setTimeout(() => {
//     initTime = Date.now()

//   }, delay)
// }
