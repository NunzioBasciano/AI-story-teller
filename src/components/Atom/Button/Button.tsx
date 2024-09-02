import style from './button.module.css'

interface IButtonProps {
    label: string;
    onClick?: () => void;
}

function Button(props: IButtonProps) {

    const { label, onClick } = props;
    return (
        <button onClick={onClick} className={style.button}>{label}</button>
    )
}

export default Button