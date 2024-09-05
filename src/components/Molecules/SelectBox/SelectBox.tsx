import Label from '../../Atom/Label/Label';
import style from './selectBox.module.scss';
import { ListOption } from '../../../data/types/common';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { labels } from '../../../data/labels';

interface ISelectBoxProps {
    label: string;
    list: ListOption[];
    setAction: Dispatch<SetStateAction<string>>;
}

function SelectBox(props: ISelectBoxProps) {
    const { label, list, setAction } = props;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setAction(e.target.value);
    }

    return (
        <div className={style.container}>
            <Label
                label={label}
            />
            <select className={style.select} name="select" onChange={handleChange}>
                <option value="" hidden>
                    {labels.selectLabel}
                </option>
                {list.map((item) => {
                    return (
                        <option className={style.option} key={item.value} value={item.value}>{item.label}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default SelectBox