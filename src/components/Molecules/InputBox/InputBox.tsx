import Input from '../../Atom/Input/Input';
import Label from '../../Atom/Label/Label';
import style from './inputBox.module.scss';
import { Dispatch, SetStateAction } from 'react';


interface IInputBox {
    label: string;
    placeholder: string;
    setValue: Dispatch<SetStateAction<string>>;
    value: string;
    inputType?: 'text' | 'email' | 'number' | 'textarea';
}

function InputBox(props: IInputBox) {

    const { label, placeholder, setValue, value, inputType } = props;

    return (
        <div className={style.container}>
            <Label
                label={label}
            />

            {inputType === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            ) : (
                <Input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    setValue={setValue}
                />

            )

            }
        </div>
    )
}

export default InputBox