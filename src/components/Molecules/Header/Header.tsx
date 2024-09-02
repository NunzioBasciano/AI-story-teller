import style from './header.module.css'
import Button from '@/components/Atom/Button/Button';
import { labels } from '@/data/labels';

interface IHeaderProps {
    title: string;
}

function Header(props: IHeaderProps) {
    const { title } = props
    return (
        <header className={style.container}>
            <h1>{title}</h1>
            <Button
                label={labels.loginButtonLabel}

            />
        </header>
    )
}

export default Header