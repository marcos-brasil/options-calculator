import Head from "next/head";

type Props = {
  children: JSX.Element
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Options Calculator</title>
        <meta name="description" content="Blasck Scholes Options Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div></div>
      <div className="flex flex-col items-center h-screen">
        <nav className="flex fixed items-center justify-between w-full h-10  md:max-w-5xl bg-slate-300">
          <div className="pl-1 bg-slate-400">Logo</div>
          <div className="pr-1 bg-slate-400">About</div>
        </nav>
        {children}
        <div className="flex px-4 w-full md:max-w-3xl">
          <footer className="flex p-2  border-t-2 items-center w-full justify-center">
            <div className="flex mx-2 bg-blue-100 text-xs">
              The information on this site is for educational purposes only.
              This website is not giving advice nor is qualified or licensed to
              provide financial advice. You must seek guidance from your
              personal advisors before acting on this information. Trading can
              result in losses. We will accept no responsibility for any losses
              you may incur. Do not invest more than you can afford to lose.
              Please see other Disclaimers and Warnings elsewhere on this site.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
