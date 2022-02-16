import styles from "./index.module.css";

type Props = {
  title: string;
  data: Array<{ legend: string; value: string }>;
};

export default function StatsTable({ title, data }: Props) {
  return (
    // <div className="flex min-w-fit items-center bg-stone-300">

    <div className={styles.container}>
      <div className={styles.titleContent}>{title}</div>
      <div className={styles.tableContainer}>
        <table>
          <tbody>
            {data.map((item, idx) => {
              return (
                <tr
                  key={idx}
                  className={
                    idx === data.length - 1
                      ? styles.leftLastCell
                      : styles.leftCell
                  }
                >
                  <td
                    className={
                      idx === data.length - 1
                        ? styles.rightLastCell
                        : styles.rightCell
                    }
                  >
                    {item.legend}
                  </td>
                  <td className={styles.leftText}>{item.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    // </div>

  );
}
