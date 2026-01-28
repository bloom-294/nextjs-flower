import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "components/layout";
import "swiper/css/bundle";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  
    useEffect(() => {
      document.body.classList.add('loaded');
      return () => {
        document.body.classList.remove('loaded');
      };
    }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
