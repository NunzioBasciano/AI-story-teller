import React, { useEffect, useState } from 'react';
import styles from "@/styles/Home.module.scss";
import WindowBox from '@/components/Organism/WindowBox/WindowBox';
import style from './favourites.module.scss';
import Card from '@/components/Molecules/Card/Card';
import Modal from '@/components/Molecules/Modal/Modal';
import { truncateText } from '@/data/truncateText';

interface IItem {
    title: string;
    paragraphs: string;
}

function Favorites() {
    const [favorites, setFavorites] = useState<IItem[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

    // Effect to retrieve favorites from local storage on component mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const handleOpenModal = (item: IItem) => {
        setSelectedItem(item);
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setSelectedItem(null);
    };

    return (
        <div className={styles.content}>
            <WindowBox title={'Preferiti'}>
                <div className={style.list}>
                    {!isOpenModal && !selectedItem && favorites.length > 0 ? (
                        favorites.map((item, index) => (
                            <div className={styles.item} key={index}>
                                <Card
                                    openModal={() => handleOpenModal(item)}
                                    title={item.title}
                                    paragraphs={truncateText(item.paragraphs, 50)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Nessun preferito trovato.</p>
                    )}
                </div>
                {isOpenModal && selectedItem && (
                    <Modal
                        title={selectedItem.title}
                        paragraphs={selectedItem.paragraphs}
                        onClose={handleCloseModal}
                    />
                )}
            </WindowBox>
        </div>
    );
}

export default Favorites;
