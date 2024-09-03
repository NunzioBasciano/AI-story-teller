import Input from '@/components/Atom/Input/Input'
import Label from '@/components/Atom/Label/Label'
import style from './inputBox.module.scss'
import { Dispatch, SetStateAction } from 'react';


interface IInputBox {
    label: string;
    placeholder: string;
    setValue: Dispatch<SetStateAction<string>>;
    value: string;
}

function InputBox(props: IInputBox) {

    const { label, placeholder, setValue, value } = props;

    return (
        <div className={style.container}>
            <Label
                label={label}
            />
            <Input
                placeholder={placeholder}
                value={value}
                setValue={setValue}
            />
        </div>
    )
}

export default InputBox