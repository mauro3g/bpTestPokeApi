import React from 'react'

const style: { [key: string]: React.CSSProperties } = {
    navbar: {
        width: '100vw',
        height: '5vh',
        flexGrow: 1,
        backgroundColor: '#424242',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '20px 16px'
    },
    searchBox: {
        width: '20vw',
        height: '3vh',
        fontSize: '1rem'
    },
    searchButton: {
        width: '4vh',
        height: '4vh',
        margin: '0px',

    },
    addButton: {
        color: 'white',
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '7px 15px',
        cursor: 'pointer',
        border: '1px solid #fff',
        borderRadius: '5%',
        backgroundColor: '#8F8F8F',
    },
    addText: {
        margin: '0px 2px'
    }
} as const

interface Props {
    searchValue: string | undefined
    changeSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>
    handleOpenForm: () => void
}

const SearchBox = (props: Props) => {
    const { searchValue, changeSearchValue, handleOpenForm } = props

    return (
        <div style={style.navbar} data-testid="search-component">
            <h4>PokeDex</h4>
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input style={style.searchBox} type="text" placeholder="Buscar..." name="search" value={searchValue} onChange={(e) => changeSearchValue(e.target.value)} />
                    <button style={style.searchButton} type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <button style={style.addButton} onClick={() => handleOpenForm()}>
                <i className="fa fa-plus-circle"></i>  Agregar
            </button>
        </div>
    )
}

export default SearchBox