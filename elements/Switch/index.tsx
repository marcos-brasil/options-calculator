import type { ChangeEvent } from "react";

type Props = {
  legend: JSX.Element;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  switchClass?: string;
};

export default function Switch({ legend, onChange, switchClass }: Props) {
  return (
    <label className="relative flex items-center h-fit text-xl">
      <input
        onChange={onChange}
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full peer appearance-none rounded-md"
      />
      <span
        className={
          switchClass ||
          "w-12 h-7 flex items-center flex-shrink-0 p-1 bg-green-300 rounded-full duration-300 ease-in-out peer-checked:bg-red-300 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"
        }
      ></span>
      {legend}
    </label>
  );
}
