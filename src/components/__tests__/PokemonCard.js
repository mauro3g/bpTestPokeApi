import { render, screen, cleanup } from '@testing-library/react';
import PokemonCard from '../PokemonCard/PokemonCard'
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


test('should render a button component', () => {
    render(<PokemonCard pokemon={defaultPokemon} index={0} handleOpenForm={()=>{}} handleDeletePokemon={()=>{}}></PokemonCard>)
    const element = screen.getByTestId('card-component')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent(defaultPokemon.name)
})

test('match snapshop', ()=>{
    const testBtn = renderer.create(<PokemonCard pokemon={defaultPokemon} index={0} handleOpenForm={()=>{}} handleDeletePokemon={()=>{}}></PokemonCard>).toJSON()
    expect(testBtn).toMatchSnapshot()
})

