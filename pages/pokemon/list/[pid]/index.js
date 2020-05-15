import React from "react";
import PokemonContainer from './../index.js';
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();
    const {pid} = router.query;

    return <PokemonContainer pid={pid}/>
}
