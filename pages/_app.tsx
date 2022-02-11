import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
// import {motion} from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      {/* <motion.div exit={{opacity: 0}}> */}

      <Component {...pageProps} />
      {/* </motion.div> */}
    </Layout>
  );
}

export default MyApp;
