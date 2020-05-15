
import Page from "../../../components/block.js";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from 'next/router';
import Pokemons from './[pid]/[id].js';
import {useState} from 'react';
let arr1 = [];

for (let i = 1; i <= 42; i++) {
    arr1[i - 1] = i;
}

export default function Home() {
    const router = useRouter();
    const {pid} = router.query;
    let [id, setId] = useState(pid ? pid : null);

    useEffect(() => {
        if (!id && pid) {
            setId(pid);
        }
    });

    function next(nextId) {
        if (id) {
            setId(+nextId + 1);
        }
    }

    function before(nextId) {
        if (id) {
            setId(+nextId - 1);
        }
    }

    return (
        <div className="container">
            <main>
                <h1 className="title ">
                    Welcome to Pokemon page
                </h1>

                {(pid) && !pid.match(/\D/) ?
                    <Pokemons pid={pid}/> :
                    <div className='grid-pokemon-6'>
                        {
                            arr1.map((value) => <Page key={value} propsId={value}/>)
                        }
                    </div>
                }

                <div className='buttons'>
                    {pid && !pid.match(/\D/) ? <>
                            {
                                (pid > 0) &&
                                <Link href={`/pokemon/list/[pid]`} as={'/pokemon/list/'+ (+pid - 1)}>
                                    <button className='before btn' onClick={() => before(id)}>before</button>
                                </Link>
                            }
                            {
                                (pid <= 807 / 42 -1) &&
                                <Link href={'/pokemon/list/[pid]'} as={'/pokemon/list/' + (+pid + 1)}>
                                    <button className='next btn' onClick={() => next(id)}>next</button>
                                </Link>
                            }

                        </> :
                        <Link href={'/pokemon/list/[pid]'} as={'/pokemon/list/' + (+0 + 1)}>
                            <button className='next btn' onClick={() => next(0)}>next</button>
                        </Link>

                    }
                </div>
            </main>

            <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          width: 100%;
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
        }

        .buttons{
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          padding: 20px;
        }
        
        .btn{
          font-size: 24px;
          background-color: #e2d38c;
          color: #2d0518;
          border: 1px solid #886516;
          box-shadow: 0 0 15px white;
          padding: 8px 25px;
          border-radius: 10px;
          cursor: pointer;
          align-self: center;
        }
        h1{
          text-align: center;
        }
        
        .next{
          grid-column: 3/4;
          justify-self: end;
        }

        .before{
          grid-column: 2/3;
          justify-self: start;
        }

        .btn:hover{
          background-color: #c4b778;
        }

        .btn:active{
          background-color: #918659;
        }
        
        .grid-pokemon-6{
            box-sizing: border-box;
            justify-content: space-around;
            margin-top: 30px;
            display: grid;
            width: 100%;
            max-width: 1800px ;
            grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
            grid-row-gap: 40px;
            grid-column-gap:10px ;
            padding: 1em;
        }
        
        @media (max-width: 600px) {
             .container {
                  padding: 0 10px;
             }            
             
             main {
                padding: 0;
             }
             
             .grid-pokemon-6{
                margin-top: 0;
                grid-row-gap: 20px;
                grid-column-gap:10px;
                grid-template-columns: repeat(auto-fit,minmax(150px,1fr)) ;
                width: 85%;
                padding: 0;
             }
        
        }
        
      `}</style>

        </div>
    )
}
