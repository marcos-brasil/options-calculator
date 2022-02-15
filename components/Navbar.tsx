import Link from "next/link";

import { useRouter } from "next/router";

export default function NavBar() {
  let router = useRouter();

  // let rightItem =
  // router.asPath === "/about" ? <></> :
  return (
    <nav className="px-4 sm:px-2 justify-center flex fixed  w-full h-10 bg-stone-200 shadow-md z-50">
      <div className="flex items-center min-w-[300px] w-full md:max-w-4xl justify-between">
        <LeftItem />
        <RightItem />
      </div>
    </nav>
  );
}

function RightItem() {
  let router = useRouter();

  if (router.asPath === "/about") {
    return <></>;
  }

  return (
    <Link href="/about" scroll={false}>
      <a className="pr-1 ">About</a>
    </Link>
  );
}

function LeftItem() {
  let router = useRouter();

  if (router.asPath === "/about") {
    return (
      <Link href="/" scroll={false}>
        <a className="pr-1  text-3xl">
          <ArrowBack />
        </a>
      </Link>
    );
  }

  return (
    <div className="flex items-center ">
      {/* creating logo the hacky way */}
      <span className="pl-1  text-2xl italic">Θ</span>
      <span className="font-bold italic">ptions</span>
    </div>
  );
}

function ArrowBack() {
  return (
    <div className="w-8 h-8">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
      </svg>
    </div>
  );
}
