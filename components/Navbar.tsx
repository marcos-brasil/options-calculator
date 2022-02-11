import Link from "next/link";

import { useRouter } from "next/router";

export default function NavBar() {
  let router = useRouter();

  let leftItem =
    router.asPath === "/about" ? (
      <Link href="/" scroll={false}>
        <a className="pr-1 bg-slate-400 text-3xl"><ArrowBack /></a>
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


function ArrowBack() {
  return (
    <div className="w-10 h-10">

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
    </svg>
    </div>
  );
}
