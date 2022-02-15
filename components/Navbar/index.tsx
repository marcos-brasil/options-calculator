import Link from "next/link";

import { useRouter } from "next/router";

import styles from "./index.module.css";

export default function NavBar() {
  let router = useRouter();

  // let rightItem =
  // router.asPath === "/about" ? <></> :
  return (
    <nav className={styles.container}>
      <div className={styles.content}>
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
      <a className={styles.about}>About</a>
    </Link>
  );
}

function LeftItem() {
  let router = useRouter();

  if (router.asPath === "/about") {
    return (
      <Link href="/" scroll={false}>
        <a>
          <ArrowBack />
        </a>
      </Link>
    );
  }

  return (
    <div className={styles.logo}>
      {/* creating logo the hacky way */}
      <span className={styles.thetaLogo}>Θ</span>
      <span>ptions</span>
    </div>
  );
}

function ArrowBack() {
  return (
    <div className={styles.arrowBack}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
      </svg>
    </div>
  );
}
