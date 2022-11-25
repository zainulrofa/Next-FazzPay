import React from "react";
import Head from "next/head";
// import Header from "./Header";

function Layout({ children, title = "Zwallet", isHeaderShown = false }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {isHeaderShown && <Header />}
      {children} */}
    </>
  );
}

export default Layout;
