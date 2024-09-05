import { Dispatch, SetStateAction, useEffect } from 'react';
import style from './toast.module.scss'

interface IToastProps {
    title: string;
    message: string;
    setAction: Dispatch<SetStateAction<boolean>>

}

function Toast(props: IToastProps) {
    const { title, message, setAction } = props;

    useEffect(() => {
        const timeOutID = setTimeout(() => {
            setAction(false)
        }, 3000);
        return () => clearTimeout(timeOutID);
    }, [setAction])

    return (
        <div className={style.container}>
            <div className={style.title_container}>
                <h3>{title}</h3>
                <p className={style.close} onClick={() => setAction(false)}>X</p>
            </div>
            <p>{message}</p>
            <div className={style.progress_bar}>
                <div className={style.fill}></div>
            </div>
        </div>
    )
}

export default Toast