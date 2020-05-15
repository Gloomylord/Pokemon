
import React, {useState} from 'react';


import dynamic from "next/dynamic";
import style from "../public/style.module.css";
import Home from "./home";
//
// const Home = dynamic(() => import("./home"), {
//     loading: () => <>
//         <h1>Loading...</h1>
//         <style jsx global>{`
//         html,
//         body {
//           display: flex;
//           justify-content: center;
//           width: 100%;
//           height: 100%;
//           padding: 0;
//           margin: 0;
//           background: linear-gradient(180deg, rgba(88,134,174,0.2) 0%,rgba(88,134,174,0.5) 50%, rgba(88,134,174,1) 100%);
//           font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
//             Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
//             sans-serif;
//         }
//
//         * {
//           box-sizing: border-box;
//         }
//         #__next{
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }
//         a {
//           text-decoration: none;
//         }
//
//         h1{
//           align-self: center;
//         }
//
//       `}</style>
//         </>
// });

const App = () => (
    <>
        <Home/>
    </>
);


export default App;


