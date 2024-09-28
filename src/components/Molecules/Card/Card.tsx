import React from 'react';
import styles from './card.module.scss';

interface ICard {
    title: string;
    paragraphs: string;
    openModal: () => void;
}

function Card(props: ICard) {
    const { title, paragraphs, openModal } = props;

    return (
        <div className={styles.container} onClick={openModal}> {/* Aggiungi onClick qui */}
            <h3>{title}</h3>
            <p>{paragraphs}</p>
        </div>
    );
}

export default Card;
