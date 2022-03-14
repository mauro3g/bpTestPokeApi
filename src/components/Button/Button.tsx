import React from 'react'

const style: { [key: string]: React.CSSProperties } = {
    button: {
        color: 'white',
        textAlign: 'center',
        fontSize: '1rem',
        padding: '10px 32px',
        margin: '2px 2px',
        cursor: 'pointer',
        border: '2px solid #008CBA',
        backgroundColor: '#008CBA',
        borderRadius: '5%'
    },
} as const

interface Props {
    type: "button" | "submit" | "reset" | undefined,
    label: string
}

const Button = (props: Props) => {
    const { type, label } = props
    return (
        <button style={style.button} type={type}>{label}</button>
    )
}

export default Button