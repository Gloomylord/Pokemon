import Page from "../../../../components/block.js";
import React from "react";


export default function PokemonList({pid}) {
    let arr1 = [];
    for (let i = (pid) * 42 + 1; i <= (+pid + 1) * 42 && i <= 807; i++) {
        arr1[i - (pid) * 42] = i;
    }

    return (
        <div className='grid-pokemon-6'>
            {
                arr1.map((value) => <Page key={value} propsId={value}/>)
            }
            <style jsx>{`
                .grid-pokemon-6{
                    box-sizing: border-box;
                    justify-items: center;
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
             `}
            </style>
        </div>
    )
}
