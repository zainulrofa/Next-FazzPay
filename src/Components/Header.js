import React from "react";
import Head from "next/head";

function Header({ children, title }) {
  return (
    <>
      <Head>
        <title>{`${title} | FazzPay`}</title>
        <meta
          name="description"
          content="Z-Wallet || Solution For Your Transaction"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}

export default Header;
