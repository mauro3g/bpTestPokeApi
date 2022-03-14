import React from 'react'
import useValues from '../../hooks/values/useValues'
import { TYPES } from '../../lib/constants/catalog'
import { FIELDS } from '../../lib/constants/fields'
import { createPokemonsService, editPokemonsService } from '../../lib/utils/api'
import { IPokemon } from '../../types/types'
import Button from '../Button/Button'

const style: { [key: string]: React.CSSProperties } = {
    modal: {
        position: 'fixed',
        zIndex: 1, /* Sit on top */
        paddingTop: '100px', /* Location of the box */
        left: 0,
        top: 0,
        width: '100%', /* Full width */
        height: '100%', /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        backgroundColor: 'rgba(0,0,0,0.4)' /* Black w/ opacity */
    },
    modalContent: {
        backgroundColor: '#fefefe',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%'
    },
    close: {
        color: '#aaaaaa',
        float: 'right',
        fontSize: '28px',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    formContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '15px'
    },
    inputBox: {
        display: 'flex',
    },
    inputLabel: {
        width: '5vw',
        margin: '5px 10px'
    },
    inputMargin: {
        marginBottom: '20px'
    }
} as const

interface Props {
    edit?: boolean
    pokemon?: IPokemon
    handleCloseForm: () => void,
    refreshPokemonData: () => Promise<void>
}
const defaultPokemon: IPokemon = {
    id: 0,
    name: '',
    image: '',
    type: 'fire',
    hp: 50,
    attack: 50,
    defense: 50,
    idAuthor: 1
}

const PokemonForm = (props: Props) => {
    const { edit, pokemon, handleCloseForm, refreshPokemonData } = props
    const { values: pokemonValues, updateValue: handleChange } = useValues(edit ? pokemon : defaultPokemon)

    const handleSubmit = async () => {
        const newPokemon: IPokemon = defaultPokemon
        if(edit){
            newPokemon.id = pokemon?.id as number
        }
        newPokemon.name = pokemonValues[FIELDS.name.key]
        newPokemon.image = pokemonValues[FIELDS.image.key]
        newPokemon.type = pokemonValues[FIELDS.type.key]
        newPokemon.hp = pokemonValues[FIELDS.hp.key]
        newPokemon.attack = pokemonValues[FIELDS.attack.key]
        newPokemon.defense = pokemonValues[FIELDS.defense.key]
        if (edit) {
            await editPokemonsService(newPokemon)
        } else {
            await createPokemonsService(newPokemon)
        }
        refreshPokemonData()
        handleCloseForm()
    }

    return (
        <div id="myModal" style={style.modal}>
            <div style={style.modalContent} >
                <span style={style.close} onClick={() => handleCloseForm()}>&times;</span>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                    <h4>{edit ? 'Editar Pokemon' : 'Crear Pokemon'}</h4>
                    <div style={style.formContent} >
                        <div style={style.inputContainer}>
                            <label style={style.label} htmlFor="fname">{FIELDS.name.name} :  </label>
                            <input required type="text" id="fname" value={pokemonValues[FIELDS.name.key]} onChange={(e) => handleChange(FIELDS.name.key, e.target.value)}></input><br />
                            <label style={style.label} htmlFor="fimage">{FIELDS.image.name} : </label>
                            <input required type="text" id="fimage" name="fimage" value={pokemonValues[FIELDS.image.key]} onChange={(e) => handleChange(FIELDS.image.key, e.target.value)}></input><br></br>
                            <label htmlFor="ftype">{FIELDS.type.name} </label>
                            <select name="ftype" id="ftype" value={pokemonValues[FIELDS.type.key]} onChange={(e) => handleChange(FIELDS.type.key, e.target.value)}>
                                {
                                    TYPES.map((type) => <option value={type}>{type}</option>)
                                }
                            </select>

                        </div>
                        <div style={style.inputContainer}>
                            <label style={style.label} htmlFor="fhp">{FIELDS.hp.name} : {pokemonValues[FIELDS.hp.key]}</label>
                            <input style={style.inputMargin} required type="range" min="1" max="100" id="fhp" name="fhp" value={pokemonValues[FIELDS.hp.key]} onChange={(e) => handleChange(FIELDS.hp.key, parseInt(e.target.value))}></input>
                            <label style={style.label} htmlFor="fhp">{FIELDS.attack.name} : {pokemonValues[FIELDS.attack.key]}</label>
                            <input style={style.inputMargin} required type="range" min="1" max="100" id="fhp" name="fhp" value={pokemonValues[FIELDS.attack.key]} onChange={(e) => handleChange(FIELDS.attack.key, parseInt(e.target.value))}></input>
                            <label style={style.label} htmlFor="fhp">{FIELDS.defense.name} : {pokemonValues[FIELDS.defense.key]}</label>
                            <input required type="range" min="1" max="100" id="fhp" name="fhp" value={pokemonValues[FIELDS.defense.key]} onChange={(e) => handleChange(FIELDS.defense.key, parseInt(e.target.value))}></input>
                        </div>
                    </div>
                    <Button type="submit" label={edit ? "Editar" : "Crear"}></Button>
                </form>
            </div>

        </div>
    )
}

export default PokemonForm