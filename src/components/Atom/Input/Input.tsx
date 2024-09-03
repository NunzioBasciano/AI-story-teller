import { Dispatch, SetStateAction, useState } from 'react';
import style from './input.module.scss'

interface IInputProps {
    type?: string;
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>
}

function Input(props: IInputProps) {
    const { type = 'text', placeholder, value, setValue } = props;

    return (
        <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className={style.input}
            type={type}
            placeholder={placeholder}
        />
    )
}

export default Input