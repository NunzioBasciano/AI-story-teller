import style from './label.module.scss'

export interface ILabelProps {
    label: string;

}

function Label(props: ILabelProps) {

    const { label } = props;
    return (
        <h3 className={style.label}>{label}</h3>
    )
}

export default Label