import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, MutableRefObject } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.css";

type Props = {
  month?: string;
  year?: string;
  day?: string;
  register?: UseFormRegisterReturn;
  placeholder: string;
  id: string;
  onChange: (evt: string) => void;
};

export default function DateSelect({
  day,
  register,
  month,
  year,
  onChange,
}: Props) {
  let today = new Date();

  let [selectedYear, setSelectedYear] = useState(
    year || String(today.getFullYear())
  );

  let [selectedMonth, setSelectedMonth] = useState(
    String(month || today.getMonth() + 1)
  );

  let [selectedDay, setSelectedDay] = useState(String(day || today.getDate()));

  let fixedMonth =
    String(selectedMonth).length === 1 ? `0${selectedMonth}` : selectedMonth;

  let fixedDay =
    String(selectedDay).length === 1 ? `0${selectedDay}` : selectedDay;

  let [inputValue, setInputValue] = useState(
    `${selectedYear}-${fixedMonth}-${fixedDay}`
  );

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue, onChange]);

  let [years, months, days] = createSelectDateOptions(selectedYear);

  let parentRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    let value = `${selectedYear}-${fixedMonth}-${fixedDay}`;
    // input.value =

    setInputValue(value);
  }, [fixedDay, fixedMonth, selectedYear]);

  return (
    <>
      <div ref={parentRef} className="fixed w-0 h-0">
        <input
          {...register}
          aria-label="expiration date"
          className="fixed w-0 h-0"
          value={inputValue}
          // checked={true}
        ></input>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col  xs:flex-row gap-2 ml-[92px] pb-1">
          <div className="flex w-fit h-fit pr-6">year</div>
          <div className="flex w-fit h-fit pr-3">month</div>
          <div className="flex w-fit h-fit pr-0">day</div>
        </div>
        <div className="flex flex-col xs:flex-row gap-2">
          <label className="flex pr-2">Expiration</label>
          <div className="">
            <select
              value={Number(selectedYear)}
              className={styles.select}
              placeholder="year"
              onChange={(e) => {
                setSelectedYear(e.target.value);
                (parentRef.current.children[0] as HTMLInputElement).focus();
                (parentRef.current.children[0] as HTMLInputElement).blur();
              }}
            >
              {years.map((y) => {
                return (
                  <option value={y} key={y}>
                    {y}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-end pl-2 w-14">
            <select
              value={Number(selectedMonth)}
              className={styles.select}
              placeholder="month"
              onChange={(e) => {
                let fixedMonth =
                  e.target.value.length === 1
                    ? `0${e.target.value}`
                    : e.target.value;

                // console.log('=====', fixedMonth)

                setSelectedMonth(fixedMonth);
                (parentRef.current.children[0] as HTMLInputElement).focus();
                (parentRef.current.children[0] as HTMLInputElement).blur();
              }}
            >
              {months.map((m) => (
                <option value={m} key={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end w-14">
            <select
              value={Number(selectedDay)}
              className={styles.select}
              placeholder="day"
              onChange={(e) => {
                let fixedDay =
                  e.target.value.length === 1
                    ? `0${e.target.value}`
                    : e.target.value;

                setSelectedDay(fixedDay);
                (parentRef.current.children[0] as HTMLInputElement).focus();
                (parentRef.current.children[0] as HTMLInputElement).blur();
              }}
            >
              {days
                .filter(filterDaysCorrectly(selectedYear, selectedMonth))
                .map((d) => {
                  return (
                    <option value={d} key={d}>
                      {d}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

function createSelectDateOptions(year: string) {
  let years = [];
  let months = [];
  let days = [];

  for (let idx = Number(year); idx <= Number(year) + 10; idx++) {
    years.push(idx);
  }

  for (let idx = 1; idx <= 12; idx++) {
    months.push(idx);
  }

  for (let idx = 1; idx <= 31; idx++) {
    days.push(idx);
  }

  return [years, months, days];
}

function filterDaysCorrectly(year: string, month: string) {
  return (day: number): boolean => {
    if (Number(month) % 2 === 0 && Number(month) !== 2 && day > 30) {
      return false;
    }

    if (Number(month) % 2 === 1 && Number(month) !== 2) {
      return true;
    }

    if (Number(year) % 4 !== 0 && Number(month) === 2 && day > 28) {
      return false;
    }

    if (Number(year) % 4 === 0 && Number(month) === 2 && day > 29) {
      return false;
    }

    return true;
  };
}

// export function DateDropdown() {
//   let [displayDropdown, setDisplayDropdown] = useState(
//     styles.dropdownContainerHidden
//   );

//   return (
//     <div className="">
//       <div>
//         <div className="flex flex-col items-center">
//           <button
//             className={styles.button}
//             type="button"
//             id="dropdownMenuButton1d"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//             onClick={() => {
//               setDisplayDropdown(styles.dropdownContainer);
//             }}
//           >
//             Dropdown divider
//             <ArrowDown />
//           </button>
//           <div className="flex absolute mt-8 h-40">
//             <ul
//               className={displayDropdown}
//               aria-labelledby="dropdownMenuButton1d"
//             >
//               <li>
//                 <a
//                   className="
//               dropdown-item
//               text-sm
//               py-2
//               px-4
//               font-normal
//               block
//               w-full
//               whitespace-nowrap
//               bg-transparent
//               text-gray-700
//               hover:bg-gray-100
//             "
//                   href="#"
//                 >
//                   Action
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className="
//               dropdown-item
//               text-sm
//               py-2
//               px-4
//               font-normal
//               block
//               w-full
//               whitespace-nowrap
//               bg-transparent
//               text-gray-700
//               hover:bg-gray-100
//             "
//                   href="#"
//                 >
//                   Another action
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className="
//               dropdown-item
//               text-sm
//               py-2
//               px-4
//               font-normal
//               block
//               w-full
//               whitespace-nowrap
//               bg-transparent
//               text-gray-700
//               hover:bg-gray-100
//             "
//                   href="#"
//                 >
//                   Something else here
//                 </a>
//               </li>
//               <hr className="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" />
//               <li>
//                 <a
//                   className="
//               dropdown-item
//               text-sm
//               py-2
//               px-4
//               font-normal
//               block
//               w-full
//               whitespace-nowrap
//               bg-transparent
//               text-gray-700
//               hover:bg-gray-100
//             "
//                   href="#"
//                 >
//                   Separated link
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ArrowDown() {
//   return (
//     <svg
//       aria-hidden="true"
//       focusable="false"
//       data-prefix="fas"
//       data-icon="caret-down"
//       className="w-2 ml-2"
//       role="img"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 320 512"
//     >
//       <path
//         fill="currentColor"
//         d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
//       ></path>
//     </svg>
//   );
// }
