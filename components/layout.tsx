import Header from "./Organisms/header";
import Footer from "./Organisms/footer";
import Head from "next/head";
// import { Head } from "next/document"
// import { Html, Head, Main, NextScript } from "next/document"

export const Layout = ({ children }: any) => {

  return (
    <>
      <div className="conatiner">
      <Header />
        <main>{children}</main>
      </div>
      <Footer />


    </>
  );
}

export default Layout;
