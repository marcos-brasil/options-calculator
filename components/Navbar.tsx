import Link from "next/link";

import { useRouter } from "next/router";

export default function NavBar() {
  let router = useRouter();

  let leftItem =
    router.asPath === "/about" ? (
      <Link href="/" scroll={false}>
        <a className="pr-1 bg-slate-400 text-3xl">⬅</a>
      </Link>
    ) : (
      <div className="flex items-center bg-slate-400">
        <span className="pl-1  text-2xl italic">Θ</span>
        <span className="font-bold italic">ptions</span>
      </div>
    );

  let rightItem =
    router.asPath === "/about" ? (
      <></>
    ) : (
      <Link href="/about" scroll={false}>
        <a className="pr-1 bg-slate-400">About</a>
      </Link>
    );

  // let rightItem =
  // router.asPath === "/about" ? <></> :
  return (
    <nav className="px-4 sm:px-2 flex fixed items-center justify-between w-full h-10 min-w-[450px] md:max-w-5xl bg-slate-300">
      {leftItem}
      {rightItem}
    </nav>
  );
}
