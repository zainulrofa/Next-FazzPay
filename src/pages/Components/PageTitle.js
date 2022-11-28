import Head from "next/head";
import React from "react";

function PageTitle({ title }) {
  return (
    <Head>
      <title>{`${title} | FazzPay`}</title>
      <meta
        name="description"
        content={`${title} of Fazzpay, a money transfer app`}
      />
    </Head>
  );
}

export default PageTitle;
