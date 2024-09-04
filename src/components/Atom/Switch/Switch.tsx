import { useState } from 'react';
import style from './switch.module.scss'

function Switch() {

    const [active, setActive] = useState(false);

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