import { useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./index.module.css";

type Props = {
  month?: number
  year? :number
  day?: number
  placeholder: string;
  id: string;
  onChange: (
    evt: { year: number } | { month: number } | { day: number }
  ) => void;
};

export default function DateSelect({ day, month, year, onChange }: Props) {
  let today = new Date();
  let [todayYear, setTodayYear] = useState(today.getFullYear());
  let [todayMonth, setTodayMonth] = useState(today.getMonth() + 1);
  let [todayDay, setTodayDay] = useState(day || today.getDate());

  let years = [];
  let months = [];
  let days = [];

  for (let idx = todayYear; idx <= todayYear + 10; idx++) {
    years.push(idx);
  }

  for (let idx = 1; idx <= 12; idx++) {
    months.push(idx);
  }

  for (let idx = 1; idx <= 31; idx++) {
    days.push(idx);
  }

  // console.log('---------')
  // console.log(years)

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col  xs:flex-row gap-2 ml-[92px] pb-1">
          <div className="flex w-fit h-fit pr-6">year</div>
          <div className="flex w-fit h-fit pr-3">month</div>
          <div className="flex w-fit h-fit pr-0">day</div>
        </div>
        <div className="flex flex-col xs:flex-row">
          <label className="flex pr-2">
            Expiration
          </label>
          <div className="">
            <select
              value={todayYear}
              className={styles.select}
              placeholder="year"
              // defaultValue={"month"}
              onChange={(e) => {
                setTodayYear(Number(e.target.value));
                onChange({ year: Number(e.target.value) });
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
              value={todayMonth}
              className={styles.select}
              placeholder="month"
              onChange={(e) => {
                setTodayMonth(Number(e.target.value));
                onChange({ month: Number(e.target.value) });
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
              value={todayDay}
              className={styles.select}
              placeholder="day"
              onChange={(e) => {
                setTodayDay(Number(e.target.value));
                onChange({ day: Number(e.target.value) });
              }}
            >
              {days.map((d) => {
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
