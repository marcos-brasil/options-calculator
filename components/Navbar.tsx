import Link from "next/link";

import { useRouter } from "next/router";

export default function NavBar() {
  let router = useRouter();

  let leftItem =
    router.asPath === "/about" ? (
      <Link href="/" scroll={false}>
        <a className="pr-1 bg-slate-400">Calculator</a>
      </Link>
    ) : (
      <div className="pr-1 bg-slate-400">Logo</div>
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
    <nav className="flex fixed items-center justify-between w-full h-10 min-w-[350px] md:max-w-5xl bg-slate-300">
      {leftItem}
      {rightItem}
    </nav>
  );
}
