import Head from 'next/head'
import Page from "../components/block.js";
import React, {useState} from 'react';
import style from '../public/style.module.css';
import Link from "next/link";

let arr1 = [];
for (let i = 1; i <= 18; i++) {
    arr1[i - 1] = i;
}

export default function Home() {

    return (
        <div className="container">
            <Head>
                <title>Pokemon</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="title">
                    Welcome to Pokemon page
                </h1>

                <div className='grid-pokemon-3'>
                    {
                        arr1.map((value) => <Page key={value} propsId={value}/>)
                    }
                </div>

                <Link href={'/pokemon/list'} as={'/pokemon/list'}>
                    <button className='more-pokemon'>
                        More pokemon
                    </button>
                </Link>

            </main>

            <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          width: 100%;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        h1{
          color: #4b00b9 ;
          padding:0 5px ;
          text-align: center;
        }
        
        .more-pokemon{
          color: #162c16;
          border: 0;
          border-radius: 5px;
          padding: 6px;
          background-color: #93d26d;
          width: 200px;
          height: 60px;
          font-size: 20px;
          margin-top: 30px;
          cursor: pointer;
        }
        .more-pokemon:hover{
            background-color: #7cb259;
        }
        .more-pokemon:active{
            background-color: #649149;
        }
        
        .more-pokemon-link{
           width: 100%;
           height: 100%;
        }

        .grid-pokemon-3{
            box-sizing: border-box;
            margin-top: 30px;
            display: grid;
            width: 70%;
            max-width: 1500px ;
            grid-template-columns: repeat(auto-fit,minmax(300px,1fr)) ;
            grid-row-gap: 40px;
            grid-column-gap:40px ;
            padding: 1em;
        }
        
        @media (max-width: 600px) {
             .container {
                  padding: 0;
             }
             
             main {
                padding: 0;
             }
             .grid-pokemon-3{
                margin-top: 0;
                grid-row-gap: 20px;
                grid-column-gap:10px;
                grid-template-columns: repeat(auto-fit,minmax(150px,1fr)) ;
                width: 85%;
                padding: 0;
             }
        }
        
      `}</style>

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
        
        
      `}</style>
        </div>
    )
}
