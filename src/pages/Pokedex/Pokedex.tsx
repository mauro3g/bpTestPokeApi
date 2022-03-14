import React from 'react'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import PokemonForm from '../../components/PokemonForm/PokemonForm'
import SearchBox from '../../components/SearchBox/SearchBox'
import { deletePokemonsService, getPokemonsService } from '../../lib/utils/api'
import { IPokemon } from '../../types/types'

const Pokedex = () => {
    const [pokemons, setPokemons] = React.useState<IPokemon[]>([])
    const [pokemonsSearch, setPokemonsSearch] = React.useState<IPokemon[]>([])
    const [searchValue, setSearchValue] = React.useState<string | undefined>(undefined)
    const [openCreateForm, setOpenCreateForm] = React.useState<boolean>(false)
    const [openEditForm, setOpenEditForm] = React.useState<boolean>(false)
    const [currentPokemon, setCurrentPokemon] = React.useState<number>(0)

    React.useEffect(() => {
        initializePokemonData()
    }, [])

    React.useEffect(() => {
        const result = pokemons.filter((pokemon) => pokemon.name.toLocaleLowerCase().includes((searchValue as string).toLocaleLowerCase()))
        console.log(result)
        setPokemonsSearch(result)
    }, [searchValue])

    const initializePokemonData = async () => {
        const apiData = await getPokemonsService()
        setPokemons(apiData)
        setPokemonsSearch(apiData)
    }
    const handleOpenCreateForm = () => {
        setOpenCreateForm(true)
    }

    const handleCloseCreateForm = () => {
        setOpenCreateForm(false)
    }
    
    const handleOpenEditForm = (index: number) => {
        setCurrentPokemon(index)
        setOpenEditForm(true)
    }

    const handleCloseEditForm = () => {
        setOpenEditForm(false)
    }

    const handleDeletePokemon = async(pokemonId: number) => {
        await deletePokemonsService(pokemonId as number)
        initializePokemonData()
    }

    return (
        <React.Fragment>
            <SearchBox searchValue={searchValue} changeSearchValue={setSearchValue} handleOpenForm={handleOpenCreateForm} />
            <div className="w-screen h-screen overflow-hidden bg-pokedex bg-center bg-cover bg-no-repeat flex flex-wrap justify-center p-4">
                {
                    pokemonsSearch?.map((pokemon, index) => {
                        return (
                            <PokemonCard pokemon={pokemon} index={index} handleOpenForm={handleOpenEditForm} handleDeletePokemon={handleDeletePokemon}/>
                        )
                    })
                }
            </div>
            {
                openCreateForm && <PokemonForm handleCloseForm={handleCloseCreateForm} refreshPokemonData={initializePokemonData}/>
            }
            {
                openEditForm && <PokemonForm handleCloseForm={handleCloseEditForm} refreshPokemonData={initializePokemonData} edit={true} pokemon={pokemonsSearch[currentPokemon]}/>
            }

        </React.Fragment>

    )
}

export default Pokedex