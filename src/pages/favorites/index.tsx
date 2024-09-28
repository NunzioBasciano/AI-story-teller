import React, { useEffect, useState } from 'react'
import styles from "@/styles/Home.module.scss";
import WindowBox from '@/components/Organism/WindowBox/WindowBox';
import style from './favourites.module.scss'

interface IItem {
    title: string;
    paragraphs: string[];
}


function Favorites() {

    const [favorites, setFavorites] = useState<IItem[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        console.log(storedFavorites);
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    return (
        <div className={styles.content}>
            <WindowBox
                title={'Favourites'}
            >
                <div className={style.list}>
                    {favorites.length > 0 ? (
                        favorites.map((item, index) => (
                            <div className={styles.item} key={index}>
                                <div className={styles.text}>
                                    <h3>{item.title}</h3>
                                    <p>{item.paragraphs}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nessun preferito trovato.</p>
                    )}
                </div>
            </WindowBox>
        </div>
    )
}

export default Favorites