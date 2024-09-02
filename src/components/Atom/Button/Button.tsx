import style from './button.module.css'

interface IButtonProps {
    label?: string;
    image?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

function Button(props: IButtonProps) {

    const { label, onClick, children } = props;
    return (
        <button onClick={onClick} className={style.button}>
            {label}
            {children}
        </button>
    )
}

export default Button