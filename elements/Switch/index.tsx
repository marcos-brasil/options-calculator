import type { ChangeEvent } from "react";

type Props = {
  id: string;
  legend: JSX.Element;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  switchClass?: string;
};

export default function Switch({ id, legend, onChange, switchClass }: Props) {
  return (
    <label htmlFor={id} className="relative flex items-center h-fit w-fit text-xl">
      <input
        id={id}
        onChange={onChange}
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full peer appearance-none rounded-md"
      />
      <span
        className={
          switchClass ||
          "w-11 h-6 flex items-center flex-shrink-0 p-1 bg-green-300 rounded-full duration-300 ease-in-out peer-checked:bg-red-300 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"
        }
      ></span>
      {legend}
    </label>
  );
}
