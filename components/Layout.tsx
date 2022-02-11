import Head from "next/head";
import NavBar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Options Calculator</title>
        <meta name="description" content="Blasck Scholes Options Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center h-screen min-w-[350px] min-h-[650px]">
        <NavBar />
        <div className="flex  items-center mt-10 p-10 h-full w-full min-h-[100px] md:max-w-3xl bg-blue-100">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
