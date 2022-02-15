type Props = {
  title: string;
  data: Array<{ legend: string; value: string }>;
};

export default function StatsTable({ title, data }: Props) {
  return (
    <div className="flex  flex-col min-w-fit h-[140px] pt-4">
      <div className="z-10 font-bold text-left pl-6 h-ful bg-stone-200">
        {title}
      </div>
      <div className="pl-4  overflow-auto">
        <table className=" w-full   ">
          <tbody className="">
            {data.map((item, idx) => {
              return (
                <tr key={idx} className="border-b border-gray-400">
                  <td className=" w-fit border-b border-r border-gray-400  text-right pr-2">
                    {item.legend}
                  </td>
                  <td className="pl-2 text-left">{item.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
