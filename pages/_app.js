import Head from "next/head";
import style from "../public/style.module.css";
import React from "react";

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <title>Pokemon</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Component {...pageProps} />
        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background: linear-gradient(180deg, rgba(88,134,174,0.2) 0%,rgba(88,134,174,0.5) 50%, rgba(88,134,174,1) 100%);
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        
        a {
          text-decoration: none;
          color: #2d0518;
          
        }
        a :hover {
            color: #700644;
          }
        a :active {
            color: #97065b;
         }
        
        a:active, a:focus { outline: none; }

        input, textarea {outline:none;}
        input:active, textarea:active {outline:none;}
        :focus {outline:none;}
        textarea {resize:none;}
        textarea {resize:vertical;}
        textarea {resize:horizontal;}
        button:active, button:focus {
            outline: none;
        }
        button::-moz-focus-inner {
            border: 0;
}
        
      `}</style>
    </>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp