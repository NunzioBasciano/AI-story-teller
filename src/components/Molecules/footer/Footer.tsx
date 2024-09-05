import { labels } from '@/data/labels'
import style from './footer.module.scss'
import { footerLinks } from '@/data/footerLinks'

interface IItem {
    alt: string,
    href: string,
    src: string,
}

interface IFooterProps {
    list: IItem[],
}

function Footer(props: IFooterProps) {
    const { list } = props
    return (
        <div className={style.container}>
            <div className={style.container_icons}>
                {list.map((item) => (
                    <a key={item.alt} className={style.container_icon} href={item.href}>
                        <img className={style.icon} src={item.src} alt={item.alt} />
                    </a>
                ))}
            </div>
            <div className={style.copyright}>
                <h4>
                    {labels.copyrightLabel}
                </h4>
            </div>
        </div>
    )
}

export default Footer

