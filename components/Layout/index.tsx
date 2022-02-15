import Head from "next/head";

import { Provider } from "react-redux";

import NavBar from "../Navbar";
import Footer from "../Footer";

import store from '../../models'

import styles from './index.module.css'

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>european Options Calculator</title>
        <meta name="description" content="Blasck Scholes European Options Calculator" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <div className={styles.container}>
          <NavBar />
          <div className={styles.content}>
            {children}
          </div>
          <Footer />
        </div>
      </Provider>
    </>
  );
}
