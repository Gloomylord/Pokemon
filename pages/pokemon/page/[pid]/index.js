import React, {useState, useEffect} from 'react';
import Link from "next/link";
import cn from 'classnames';
import fetch from 'node-fetch';

export async function getStaticPaths(context) {
    return {
        paths: [
            {params: {pid: '1'}},
        ],
        fallback: true,
    };
}


export async function getStaticProps(context) {

    let {pid} = context.params;
    const pokemonInfoFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/` + pid, {
        method: 'GET',
    });

    const pokemonInfo = await pokemonInfoFetch.json();

    let arr = [];
    for (let i of pokemonInfo.abilities) {
        let res = await fetchAbility(i.ability.url);
        arr.push(res);
    }

    return {
        props: {
            pid,
            pokemonInfo,
            arr,
        },
    }
}


let fetchAbility = async (url) => {
    let response = await fetch(url, {
        method: 'GET',
    });
    let a = await response.json();
    return {name: a.name, effect: a.effect_entries[0].effect};
};

export default function Pokemon({pokemonInfo, arr, pid}) {
    let [id, setId] = useState(pid ? pid : null);
    let [info, setInfo] = useState(pokemonInfo);
    let [abilities, setAbilities] = useState(arr);
    let [isLoading, setIsLoading] = useState(true);
    console.log(isLoading);
    useEffect(() => {
        if (pid) {
            setId(pid);
            setIsLoading(false);
        }
        if (pokemonInfo) {
            setInfo(pokemonInfo);
        }
        if (arr) {
            setAbilities(arr);
        }
    },[pid]);

    function next(nextId) {
        if (id && false) {
            setAbilities(null);
            setInfo(null);
            setId(+nextId + 1);
        }
        setIsLoading( true);
        setId(null);
    }

    function before(nextId) {
        if (id && false) {
            setAbilities(null);
            setInfo(null);
            setId(+nextId - 1);
        }
        setIsLoading( true);
        setId(null);
    }

    return (
        <div className={cn('pokemon-page', {
            'pokemon-page-2': info && !info.sprites.back_default,
        })}>
            <div className={cn('pokemon-container', {
                'pokemon-container-2': info && !info.sprites.back_default,
            })}>
                <div className='pokemon-name'>
                    {(info) ? info.name : '...'}
                </div>
                {info && info.sprites.front_default ?
                    <div className='pokemon-img'>
                        <img className='pokemon-img '
                             src={info.sprites.front_default}
                             alt='Front'/>

                    </div> :
                    <div className='pokemon-img-2'>
                        <img className='pokemon-img '
                             src={id && `https://raw.githubusercontent.com/PokeAPI/sprites/` +
                             `master/sprites/pokemon/${id}.png`}
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
                {
                    info && info.sprites.front_shiny &&
                    <div className='pokemon-img'>
                        <img className='pokemon-img '
                             src={info.sprites.front_shiny}
                             alt='Front shiny'/>

                    </div>
                }
                {
                    info && info.sprites.back_shiny &&
                    <div className='pokemon-img'>
                        <img className='pokemon-img'
                             src={info.sprites.back_shiny}
                             alt='Back shiny'/>

                    </div>
                }
            </div>

            <div className='pokemon-container-info'>
                {(info) ?
                    <>
                        <div className='types'>
                            <div className='title'>Types:</div>
                            {info.types.map((value) => value.type.name + ', ')}
                        </div>

                        <div className='title'>
                            Abilities:
                        </div>
                        {abilities ?
                            abilities.map((value) =>
                                <div key={value.name} className='abilities'>
                                    <ul>
                                        {value.name}
                                        <li>
                                            {value.effect}
                                        </li>
                                    </ul>
                                </div>) :
                            <div>Loading...</div>
                        }
                    </> :

                    'Loading...'
                }
            </div>
            {pid && !pid.match(/\D/) && <>
                {
                    pid > 0 &&
                    <Link href={`/pokemon/page/[pid]`} as={'/pokemon/page/' + (+id - 1)}>
                        <button className='before btn' onClick={() => before(id)}>before</button>
                    </Link>
                }
                {
                    pid < 807 &&
                    <Link href={'/pokemon/page/[pid]'} as={'/pokemon/page/' + (+id + 1)}>
                        <button className='next btn' onClick={() => next(id)}>next</button>
                    </Link>
                }
            </>
            }
            {pid && !pid.match(/\D/) && <>
                {
                    pid > 0 &&
                    <Link href={`/pokemon/page/[pid]`} as={'/pokemon/page/' + (+id - 1)}>
                        <button className='before btn top' onClick={() => before(id)}>before</button>
                    </Link>
                }
                {
                    pid < 807 &&
                    <Link href={'/pokemon/page/[pid]'} as={'/pokemon/page/' + (+id + 1)}>
                        <button className='next btn top' onClick={() => next(id)}>next</button>
                    </Link>
                }
            </>
            }
            <div className={"loader-container " + (!isLoading ? ' hide': ' ')}>
                <div className="loader-1"/>
            </div>
            <style jsx>{`
                .pokemon-page {
                    padding:50px;
                    display: grid;
                    min-height: 100vh;
                    grid-template-columns: repeat(9, 1fr);
                    grid-template-rows: 1fr 20fr 1fr;
                    grid-column-gap: 20px;
                }
                
                .pokemon-container-info {
                    border-radius: 10px;
                    padding: 10px 40px;
                    box-shadow: 0 0 15px white;
                    background-color: #e2d38c;
                    color: #2d0518;
                    font-size: 18px;
                    align-items: stretch;
                    justify-content: space-around;
                    text-align: start;
                    border: 1px solid #886516;
                    grid-area: 2/2/3/8;
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
                    grid-row-gap: 10px;
                    align-self: start;
                }
                
                .btn {
                    font-size: 24px;
                    background-color: #e2d38c;
                    color: #2d0518;
                    border: 1px solid #886516;
                    box-shadow: 0 0 15px white;
                    padding: 8px 25px;
                    border-radius: 10px;
                    cursor: pointer;
                    justify-self: center;
                    position: sticky;
                    top: 50px;
                    align-self: start;
                }
                
                h1{
                  text-align: center;
                }
                
                .btn:hover {
                     background-color: #c4b778;
                }
                
                .btn:active {
                    background-color: #918659;
                }
                
                .next {
                    grid-area: 2/9/3/10;                  
                }
                
                .before {
                   grid-area: 2/1/3/2;                 
                }
                
                .pokemon-container-info * {
                     align-self: center;
                }
                
                .abilities > ul {
                    text-transform: capitalize;
                    color: #2d0518;
                    font-size: 20px;
                    text-decoration: none;
                    margin: 0;
                    padding: 0;
                }
                
                .abilities > ul > li {
                    margin-top: 20px;
                    margin-left: 20px;
                    font-size: 18px;
                    line-height: 1.5em;
                }
                
                .title {
                    font-size: 30px;
                    text-align: center;
                    padding: 5px;
                }
                           
                
                .loader-container {
                  border-radius: 10px;
                  font-size: 10px;
                  position: fixed;
                  right: 50px;
                  bottom: 100px;
                  width: 70px;       
                  height: 70px;
                  transition: 200ms;
                  display: flex;
                  justify-content: center;
                  text-align: center;
                  border: 1px solid #886516;
                  background-color: #a3e38c;
                  border-collapse: collapse;
                  vertical-align: top;
                }
                
                .hide {
                transition: 700ms;
                  right: -150px;
                }
                
                .loader-1 {
                  width: 30px;
                  height: 30px;
                  position: absolute;
                  top: 50%;
                  margin: -15px auto 0;
                  border-radius: 50%;
                  background: #ffffff;
                  background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 50%);
                  background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 50%);
                  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 50%);
                  background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 50%);
                  background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 50%);
                  -webkit-animation: loader-1 1.5s infinite linear;
                  animation: loader-1 1.5s infinite linear;
                  -webkit-transform: translateZ(0);
                  -ms-transform: translateZ(0);
                  transform: translateZ(0);
                }
                
                .loader-1:before {
                  content: '';
                  width: 15px;
                  height: 15px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: #ffffff;
                  border-radius: 100% 0 0 0;
                }
                
                .loader-1:after {
                  content: '';
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #a3e38c;
                  margin: auto;
                  position: absolute;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  right: 0;
                }
                
                @-webkit-keyframes loader-1 {
                  0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                  }
                  100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                  }
                }
                
                @keyframes loader-1 {
                  0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                  }
                  100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                  }
                }

                
                .pokemon-container {               
                    background-color: #e2d38c;
                    color: #2d0518;
                    align-items: stretch;
                    justify-content: space-around;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                    border: 1px solid #886516;
                    box-shadow: 0 0 15px white;
                    display: grid;
                    grid-template-columns: repeat(auto-fill,1fr);
                    grid-template-rows: 1fr 3fr 3fr;
                    grid-area: 2/8/3/9;
                    align-self: start;
                    position: sticky;
                    top:50px;
                }
                
                .pokemon-container-2 {
                     grid-template-rows: 1fr 3fr;
                }
                
                .pokemon-name {
                    grid-column: span 2;
                    text-transform: capitalize;
                    font-size: 25px;
                    color: #2d0518;
                    align-self: center;
                }      
                
                .pokemon-img {
                    align-self: center;
                    justify-self: center;
                    width: 100px;
                    text-align: center;
                    color: #fe7a2c;
                    background: radial-gradient(circle, rgba(255,255,255,0.76) 0%, rgba(255,0,0,0) 40%);
                }
                
                .pokemon-img-2 {
                    justify-self: center;
                    width: 100px;
                    text-align: center;
                    color: #fe7a2c;
                    grid-area: 2/1/4/3;
                    align-self: center;
                    background: radial-gradient(circle, rgba(255,255,255,0.76) 0%, rgba(255,0,0,0) 40%);
                }
                
                .top {
                  display: none;
                }
                
                
                .abilities {
                    padding: 10px;
                }
                
                .types {
                    padding: 10px;
                    text-transform: capitalize;
                }
                
                @media (max-width: 1300px) {
                    .pokemon-container {
                        grid-template-columns: repeat(auto-fit,minmax(auto,1fr));
                        grid-template-rows: 1fr;
                        grid-area: 1/2/2/9;
                        grid-auto-flow: column;
                        position: static;
                    }
                    
                    .pokemon-page {
                        padding: 70px 50px;                     
                        grid-template-rows: 161px auto  30px ;
                        grid-row-gap: 20px;                   
                    }
                    
                    .pokemon-container-info {
                        grid-area: 2/2/3/9;
                        grid-template-columns: 1fr;
                        grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
                        grid-row-gap: 10px;
                    }
                     
                    .next {
                        grid-area: 1/9/2/10; 
                        align-self: center;                 
                    }
                    
                    .before {
                       grid-area: 1/1/2/2; 
                       align-self: center;                 
                    }
                }
                
                @media (max-width: 1100px) {
                    .pokemon-page {
                        padding: 50px 20px;                                       
                    }
                }
                
                @media (max-width: 970px) {
                    .pokemon-container {
                        grid-template-columns: repeat(auto-fit,minmax(auto,1fr));
                        grid-template-rows: 1fr;
                        grid-area: 1/2/2/9;
                        grid-auto-flow: column;
                        position: static;
                    }
                    
                    .pokemon-page {                    
                        grid-template-rows: 161px auto 30px ;
                        grid-row-gap: 20px;                   
                    }
                    
                    .pokemon-container-info {
                        grid-area: 2/2/3/9;
                        grid-template-columns: 1fr;
                        grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
                        grid-row-gap: 10px;
                    }
                    
                    .next {
                        grid-area: 1/9/2/10; 
                        align-self: center;                 
                    }
                    
                    .before {
                       grid-area: 1/1/2/2; 
                       align-self: center;                 
                    }
                }
                @media (max-width: 970px) {
                    
                    .pokemon-page {                    
                        grid-template-rows: 293px 46px auto ;
                        grid-row-gap: 20px;                 
                    }
                    
                    .pokemon-page-2 {
                       grid-template-rows: 167px 46px auto ;
                    }
                    
                    .pokemon-container-info {
                        grid-area: 3/1/4/10;
                        grid-template-columns: 1fr;
                        grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
                    }
                     
                     .btn{
                        position: static;
                     }
                    .next {
                        grid-area: 2/9/3/10; 
                        align-self: center;                 
                    }
                    
                    .before {
                       grid-area: 2/1/3/2; 
                       align-self: center;                 
                    }
                    .pokemon-container {
                        grid-area: 1/1/2/10;
                        grid-template-columns: repeat(auto-fit,minmax(auto,1fr));
                        grid-template-rows: 1fr;
                        grid-auto-flow: row;
                        padding: 10px 0;
                    }
                }
                @media (max-width: 600px) {
                    .pokemon-page {
                        padding: 20px 10px;   
                        grid-column-gap: 0;                                                          
                    }
                    .pokemon-container-info {
                        grid-area: 3/1/4/10;
                        grid-template-columns: 1fr;
                        grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
                        grid-row-gap: 5px;
                        padding: 0 10px;
                    }

                    
                    .btn {
                        font-size: 19px;
                    }
                    
                                                         
                    .abilities > ul {
                        font-size: 16px;
                    }
                    
                    .abilities > ul > li {
                        font-size: 14px;
                    }
                    
                    .title {
                        font-size: 24px;
                    }

                    
                    .pokemon-name {
                        font-size: 20px;
                    }      
                                                         
                }
                
                @media (max-width: 600px) {
                    .pokemon-page {
                        padding: 20px 10px;   
                        grid-column-gap: 0;                                                          
                    }
                    .pokemon-container-info {
                        grid-area: 3/1/4/10;
                        grid-template-columns: 1fr;
                        grid-template-rows: repeat(auto-fit, minmax(auto, 1fr));
                        grid-row-gap: 5px;
                        padding: 0 10px;
                    }

                    
                    .btn {
                        font-size: 19px;
                    }
                    
                                                         
                    .abilities > ul {
                        font-size: 16px;
                    }
                    
                    .abilities > ul > li {
                        font-size: 14px;
                    }
                    
                    .title {
                        font-size: 24px;
                    }

                    
                    .pokemon-name {
                        font-size: 20px;
                    }      
                                                         
                }             
                
            `}
            </style>
        </div>

    )
}
