import axios from 'axios'
import { IPokemon } from '../../types/types'

axios.defaults.baseURL = "https://pokemon-pichincha.herokuapp.com/pokemons/"

export const getPokemonsService = async () => {
    try {
        const result = await axios.get("?idAuthor=1")
        console.log(result)
        return result.data
    } catch (error) {
        const e: any = error
        throw new Error(e.response?.data)
    }
}

export const createPokemonsService = async (pokemon: IPokemon) => {
    try {
        console.log(pokemon)
        const result = await axios.post("?idAuthor=1", pokemon)
        console.log(result)
        return result.data
    } catch (error) {
        const e: any = error
        throw new Error(e.response?.data)
    }
}

export const getPokemonService = async (pokemonId: string) => {
    try {
        const result = await axios.get(pokemonId)
        return result.data
    } catch (error) {
        const e: any = error
        throw new Error(e.response?.data)
    }
}

export const editPokemonsService = async (pokemon: IPokemon) => {
    try {
        console.log(pokemon)
        const result = await axios.put(pokemon.id?.toString() as string, pokemon)
        console.log(result)
        return result.data
    } catch (error) {
        const e: any = error
        throw new Error(e.response?.data)
    }
}

export const deletePokemonsService = async (pokemonId: number) => {
    try {
        const result = await axios.delete(pokemonId.toString())
        console.log(result)
        return result.data
    } catch (error) {
        const e: any = error
        throw new Error(e.response?.data)
    }
}