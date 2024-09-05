import style from './button.module.scss'

interface IButtonProps {
    label?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

function Button(props: IButtonProps) {

    const { label, onClick, children, disabled } = props;
    return (
        <button disabled={disabled} onClick={onClick} className={style.button}>
            {label}
            {children}
        </button>
    )
}

export default Button