import React from 'react';
import styles from './modal.module.scss';
import Button from '@/components/Atom/Button/Button';

interface ModalProps {
    title: string;
    paragraphs: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, paragraphs, onClose }) => {

    const paragraphArray = paragraphs.split('.').filter(paragraph => paragraph.trim() !== '');

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>{title}</h3>
                {paragraphArray.map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}.</p>
                ))}
                <Button onClick={onClose}>Chiudi</Button>
            </div>
        </div>
    );
};

export default Modal;
