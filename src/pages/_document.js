import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style>
          {`
            /* width */
            ::-webkit-scrollbar {
              width: 0px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
              background: #ffffff;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: #888;
              // border-radius: 15px;
            }
          `}
        </style>
        {/* <title>Kannada Koota ECC</title> */}
      </Head>
      <body className="overflow-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
