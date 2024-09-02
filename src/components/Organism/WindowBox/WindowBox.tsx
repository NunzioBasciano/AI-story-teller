import style from './windowBox.module.scss'

interface IWindowBoxProps {
    title?: string;
}

function WindowBox(props: IWindowBoxProps) {
    const { title } = props;
    return (
        <div className={style.container}>
            {title &&
                <h2 className={style.title}>{title}</h2>
            }
        </div>
    )
}

export default WindowBox