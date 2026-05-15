import { ReactNode } from "react";
import Header from "./Organisms/header";
import Footer from "./Organisms/footer";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="container">
        <Header />

        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
