import { render, screen } from '@testing-library/react';
import Button from '../Button/Button'
import renderer from 'react-test-renderer'

test('should render a button component', () => {
    render(<Button type="submit" label={"testbtn"}></Button>)
    const element = screen.getByTestId('button-component')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent("testbtn")
})

test('match snapshop', ()=>{
    const testBtn = renderer.create(<Button type="submit" label={"testbtn"}></Button>).toJSON()
    expect(testBtn).toMatchSnapshot()
})