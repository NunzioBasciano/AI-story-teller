import { ReactNode } from 'react';
import style from './windowBox.module.scss'

interface IWindowBoxProps {
    title?: string;
    children: ReactNode;
}

function WindowBox(props: IWindowBoxProps) {
    const { title, children } = props;
    return (
        <div className={style.container}>
            {title &&
                <h2 className={style.title}>{title}</h2>
            }
            {children}
        </div>
    )
}

export default WindowBox