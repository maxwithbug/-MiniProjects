import Pokemonlist from "../PokemonList/PokemonList"
import Search from "../Search/Search"
//css import
import './Pokedex.css'

function Pokedex(){
    return(
            <div className="Pokedex-wrapper">
                <h1 className="Pokedex-headind">Pokedex</h1>
                <Search />
                <Pokemonlist />
            </div>
        )
    }

export default Pokedex