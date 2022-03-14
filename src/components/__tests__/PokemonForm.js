import { render, screen, cleanup } from '@testing-library/react';
import PokemonForm from '../PokemonForm/PokemonForm'
import renderer from 'react-test-renderer'

const defaultPokemon = {
    id: 0,
    name: 'Pikachu',
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png",
    type: 'fire',
    hp: 50,
    attack: 50,
    defense: 50,
    idAuthor: 1
}


test('should render a form component', () => {
    render(<PokemonForm handleCloseForm={()=>{}} refreshPokemonData={()=>{}} edit={true} pokemon={defaultPokemon}></PokemonForm>)
    const element = screen.getByTestId('form-component')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Editar Pokemon')
    expect(element).toHaveFormValues({
        fname: defaultPokemon.name,
        fimage: defaultPokemon.image,
        ftype: defaultPokemon.type,
        fhp: defaultPokemon.hp.toString(),
        fattack: defaultPokemon.attack.toString(),
        fdefense: defaultPokemon.defense.toString(),
    })
})

test('match snapshop', ()=>{
    const testBtn = renderer.create(<PokemonForm handleCloseForm={()=>{}} refreshPokemonData={()=>{}} edit={true} pokemon={defaultPokemon}></PokemonForm>).toJSON()
    expect(testBtn).toMatchSnapshot()
})


