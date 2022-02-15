import Head from "next/head";

import { Provider } from "react-redux";

import NavBar from "./Navbar";
import Footer from "./Footer";

import store from '../models'

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>european Options Calculator</title>
        <meta name="description" content="Blasck Scholes European Options Calculator" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <div className="flex flex-col items-center h-screen min-w-[300px] min-h-[650px]">
          <NavBar />
          <div className="flex  items-center mt-10 py-10 px-4 sm:px-10 h-full w-full min-h-[100px] md:max-w-3xl">
            {children}
          </div>
          <Footer />
        </div>
      </Provider>
    </>
  );
}
