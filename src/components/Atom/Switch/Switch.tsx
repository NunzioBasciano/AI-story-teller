import { Dispatch, SetStateAction, useState } from 'react';
import style from './switch.module.scss'

interface ISwitchProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

function Switch(props: ISwitchProps) {
    const { active, setActive } = props;

    const handleSwitch = () => {
        setActive(!active);
    }

    return (
        <div onClick={handleSwitch} className={style.container}>
            <div className={`${style.dot} ${active ? style.active : ''}`}></div>
        </div>

    )
}

export default Switch