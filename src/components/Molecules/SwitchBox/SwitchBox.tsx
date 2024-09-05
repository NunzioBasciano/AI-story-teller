import Label from '../../Atom/Label/Label'
import style from './switchBox.module.scss'
import Switch from '../../Atom/Switch/Switch';
import { Dispatch, SetStateAction } from 'react';

interface ISwitchBoxProps {
    label: string;
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
}

function SwitchBox(props: ISwitchBoxProps) {

    const { label, value, setValue } = props
    return (
        <div className={style.container}>
            <Label
                label={label}
            />
            <Switch
                active={value}
                setActive={setValue}
            />
        </div>
    )
}

export default SwitchBox