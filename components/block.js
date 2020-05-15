import React, {useState, useCallback, useEffect} from 'react';
import style from '../public/style.module.css';
import Link from "next/link";

let pokemonFetch = async (id) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
        method: 'GET',
    });
    return await response.json();
};

export default function Pokemon({propsId}) {
    let [id, setId] = useState(propsId);
    let [info, setInfo] = useState(null);
    useEffect(() => {
        if (id) {
            pokemonFetch(id).then((value) => {
                setInfo(value);
            });
        }
    }, [propsId]);
    return (
        <div className='pokemon-container'>
            <div className='pokemon-name'>
                {(info) ? <Link href={'/pokemon/page/[pid]'}
                                as={'/pokemon/page/' + id}
                ><a>{info.name}</a></Link> : '...'}
            </div>
            {
                info && info.sprites.back_default ?
                    < div className='pokemon-img'>
                        <img className='pokemon-img '
                             src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                             alt='Front'/>

                    </div> :
                    < div className='pokemon-img-2'>
                        <img className='pokemon-img '
                             src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                             alt='Front'/>

                    </div>
            }
            {
                info && info.sprites.back_default &&
                <div className='pokemon-img'>
                    <img className='pokemon-img'
                         src={info.sprites.back_default}
                         alt='Back'/>
                </div>
            }


            <style jsx>{`
      
        .pokemon-container{
            display: grid;
            grid-template-columns: 1fr 1fr ;
            grid-template-rows: 1fr 3fr ;
            background-color: #e2d38c;
            color: aliceblue;
            align-self: stretch;
            align-items: stretch;
            justify-content: space-around;
            border-radius: 1em;
            padding: 20px;
            text-align: center; 
            border: 1px solid #886516;
            box-shadow: 0 0 15px white;
        }
        
        .pokemon-name{
            text-transform: capitalize;
            font-size: 25px;
            color: #2d0518;
            grid-column: span 2;
            align-self: center;
        }
        .pokemon-name a{
          color: #2d0518;
        }
        
        
        
        .pokemon-img{
          justify-self: center;
          width: 100px;
          text-align: center;
          color: #fe7a2c;
        }
        
        .pokemon-img-2 {
            justify-self: center;
            width: 100px;
            text-align: center;
            color: #fe7a2c;
            grid-area: 2/1/4/3;
            align-self: center;
            background: radial-gradient(circle, rgba(255,255,255,0.76) 0%, rgba(255,0,0,0) 40%);
            min-width: 200px;
        }
        
         @media (max-width: 600px) {
             .pokemon-container{
                display: grid;
                grid-template-columns: minmax(150px , 1fr);
                grid-template-rows: 1fr 4fr ;
                background-color: #e2d38c;
                color: aliceblue;
                align-items: stretch;
                justify-content: space-around;
                border-radius: 1em;
                padding: 20px;
                text-align: center; 
                border: 1px solid #886516;
                box-shadow: 0 0 15px white;
            }
            
            .pokemon-img-2 {
                justify-self: center;
                width: 100px;
                text-align: center;
                color: #fe7a2c;
                grid-area: 2/1/4/3;
                align-self: center;
                background: radial-gradient(circle, rgba(255,255,255,0.76) 0%, rgba(255,0,0,0) 40%);
                min-width: 100px;
            }
            
            .pokemon-name{
                text-transform: capitalize;
                font-size: 25px;
                color: #2d0518;
                grid-column: span 1;
                align-self: center;
            }
            
            .pokemon-name a{
              color: #2d0518;
            }           
            
            .pokemon-img{
              justify-self: center;
              align-self: center;
              width: 100px;
              text-align: center;
              color: #fe7a2c;
            }
            
            .img-container {
              width: 100%;
              display: grid;
              grid-template-columns: repeat(auto-fit,minmax(150px,1fr));
            }
         }
        
       
        
      `}</style>
        </div>

    )
}
