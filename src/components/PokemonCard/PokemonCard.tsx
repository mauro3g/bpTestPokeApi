import React from 'react'
import { IPokemon } from '../../types/types'

const style: { [key: string]: React.CSSProperties } = {
    card: {
        color: 'white',
        textAlign: 'center',
        fontSize: '2rem',
        padding: '10px 10px',
        backgroundColor: '#424242',
        width: '21vw',
        height: '18vh',
        display: 'flex',
        alignItems: 'center',
        margin: '10px'
    },
    image: {
        backgroundColor: 'white',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        marginLeft: '10px'
    },
    textContainer: {
        flexGrow: '1',
        color: 'white',
        height: '90%',
        marginLeft: '15px',
        fontSize: '1rem'
    },
    statsBox: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px'
    },
    actions: {
        height: '80%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    actionButton: {
        fontSize: '1.2rem',
        margin: '0px 10px',
        backgroundColor: 'white',
        borderRadius: '50%',
        width: '35px',
        height: '35px'
    }
} as const

interface Props {
    pokemon: IPokemon
    index: number
    handleOpenForm: (index: number) => void,
    handleDeletePokemon: (pokemonId: number) => Promise<void>
}

const PokemonCard = (props: Props) => {
    const { pokemon, index, handleOpenForm, handleDeletePokemon } = props

    const handleDelete = () => {
        handleDeletePokemon(pokemon.id as number)
    }

    return (
        <div style={style.card} data-testid="card-component">
            <div >
                <img style={style.image} src={pokemon.image} alt='pokemon'></img>
            </div>
            <div style={style.textContainer}>
                <p>{pokemon.name}</p>
                <div>{pokemon.type}</div>
                <div style={style.statsBox}>
                    <p>Atk: {pokemon.attack} </p>
                    <p>Def: {pokemon.defense} </p>
                    <p>Hp: {pokemon.hp} </p>
                </div>
            </div>
            <div style={style.actions}>
                <button style={style.actionButton} type="button" onClick={(e) => handleOpenForm(index)}><i className="fa fa-pencil"></i></button>
                <button style={style.actionButton} type="button" onClick={(e) => handleDelete()}><i className="fa fa-times-circle-o"></i></button>
            </div>
        </div>
    )
}

export default PokemonCard