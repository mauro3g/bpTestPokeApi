import { render, screen } from '@testing-library/react';
import SearchBox from '../SearchBox/SearchBox'
import renderer from 'react-test-renderer'

test('should render a search component', () => {
    render(<SearchBox searchValue={"poke1"} changeSearchValue={()=>{}} handleOpenForm={()=>{}} />)
    const element = screen.getByTestId('search-component')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent("Agregar")
})
