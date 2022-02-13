import { useEffect, useRef } from "react";
import type { ChangeEvent, MutableRefObject } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import styles from "./index.module.css";

type Props = {
  id: string;
  register: UseFormRegisterReturn;
  animate?: boolean;
  legend: JSX.Element;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  shouldSwitch?: boolean;
};

export default function Switch({
  id,
  animate,
  legend,
  onChange,
  shouldSwitch,
  register,
}: Props) {
  let r = useRef<HTMLLabelElement>() as MutableRefObject<HTMLLabelElement>;

  animate = animate == null ? true : animate;

  useEffect(() => {
    if (shouldSwitch) {
      if (r.current) {
        r.current.click();
      }
    }

    // r.current.click();
  }, [shouldSwitch]);

  return (
    <>
      <label ref={r} htmlFor={id} className={styles.toggle}>
        <input
          {...register}
          className="appearance-none"
          name={id}
          id={id}
          type="checkbox"
          onChange={onChange}
        ></input>
        <span
          className={animate ? styles.slider : styles.sliderNoAnimation}
        ></span>
      </label>
      {legend}
    </>
  );
}
