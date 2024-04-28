import { useEffect , useState } from "react"
import './PokemonList.css'
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function Pokemonlist(){

    const [PokemonList ,setPokemonList] = useState([])
    const [isLoanding , setisLoading] = useState([true])

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'
    
    async function downloadPokemon(){
        const response = await axios.get(POKEDEX_URL) //this downloads lisrt of 20 pokemonos
        const pokemonResults = response.data.results //we get the array of pokemons  from results 

        //itrerating over the array of pokemons & using their url , to create a array of promises
        // that will download those 20 pokemons 
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url)) 

        //passing the array of promises to axios.all (it wo rks like promise.all)
        const pokemonData = await axios.all(pokemonResultPromise) //array of 20 pokemon detailed data      //it's works  only whene all the data is availabe

        //now iterate of the data of each pokemon , and extract id, name , image 
        const pokeListResult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data
            return {
                    id : pokemon.id ,
                    name : pokemon.name , 
                    image : pokemon.sprites.other.dream_world.front_default , 
                    types: pokemon.types
                }
        })

        console.log(pokeListResult);
        setPokemonList(pokeListResult)
        setisLoading(false)
    }
    
    useEffect(()=>{
        downloadPokemon()
    },[]) //dependency array
    
    
    return(
        <>
            <div className="Pokemon-list-wrapper">
                <div>PokemonList</div>
                <div>{(isLoanding) ? 'loading...' : 
                        PokemonList.map((p)=><Pokemon name ={p.name} image={p.image} key={p.id}/>)
                    }
                </div>
            </div>
        </>
    )
    
}

export default Pokemonlist