import { useEffect, useRef } from "react";
import type { ChangeEvent, MutableRefObject } from "react";
import styles from "./index.module.css";

type Props = {
  id: string;
  legend: JSX.Element;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  switchClass?: string;
};

export default function Switch({ id, legend, onChange, switchClass }: Props) {
  let r = useRef<HTMLLabelElement>() as MutableRefObject<HTMLLabelElement>;

  useEffect(() => {
    //  whenever the satte is stored and user navigate should
    // remenber values
    //
    // if (r.current) {
    //   r.current.click()
    //   console.log('******')
    //  }
  }, []);

  return (
    <>
      <label ref={r} htmlFor={id} className={styles.toggle}>
        <input
          className="appearance-none"
          name={id}
          id={id}
          type="checkbox"
          onChange={onChange}
        ></input>
        <span className={styles.slider}></span>
      </label>
      {legend}
    </>
  );
}
