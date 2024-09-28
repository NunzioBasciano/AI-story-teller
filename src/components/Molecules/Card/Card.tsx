import React from 'react';
import styles from './card.module.scss';

interface ICard {
    title: string;
    paragraphs: string;
    openModal: () => void;
}

function Card(props: ICard) {
    const { title, paragraphs, openModal } = props;

    const paragraphArray = paragraphs.split('.').filter(paragraph => paragraph.trim() !== '');
    return (
        <div className={styles.container} onClick={openModal}>
            <h3>{title}</h3>
            {paragraphArray.map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}.</p>
            ))}
        </div>
    );
}

export default Card;
