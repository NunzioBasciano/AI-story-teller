import React from 'react';
import WindowBox from '@/components/Organism/WindowBox/WindowBox'; // Assicurati che il percorso sia corretto
import styles from './information.module.scss'; // Importa il tuo stile
import style from "@/styles/Home.module.scss";


const InfoPage = () => {
    return (
        <div className={style.content}>
            <WindowBox title={'Informazioni'}>
                <div className={styles.container}>
                    <section className={styles.introduction}>
                        <h2>Introduzione</h2>
                        <p>[Nome dell'App] è un'applicazione progettata per [breve descrizione]. Risolve il problema di [problema specifico].</p>
                    </section>

                    <section className={styles.features}>
                        <h2>Caratteristiche Principali</h2>
                        <ul>
                            <li>Funzionalità 1: [Descrizione]</li>
                            <li>Funzionalità 2: [Descrizione]</li>
                            <li>Funzionalità 3: [Descrizione]</li>
                        </ul>
                    </section>

                    <section className={styles.instructions}>
                        <h2>Istruzioni per l'Uso</h2>
                        <p>Segui questi passaggi per iniziare a utilizzare l'app:</p>
                        <ol>
                            <li>Passo 1: [Descrizione]</li>
                            <li>Passo 2: [Descrizione]</li>
                            <li>Passo 3: [Descrizione]</li>
                        </ol>
                        <a href="[link al video tutorial]" target="_blank" rel="noopener noreferrer">Guarda il video tutorial</a>
                    </section>

                    <section className={styles.contact}>
                        <h2>Informazioni sui Contatti</h2>
                        <p>Email di supporto: <a href="mailto:support@example.com">support@example.com</a></p>
                        <p>Seguici su <a href="[link ai social]" target="_blank" rel="noopener noreferrer">Social Media</a></p>
                    </section>

                    <section className={styles.faq}>
                        <h2>FAQ</h2>
                        <ul>
                            <li>Domanda 1: [Risposta]</li>
                            <li>Domanda 2: [Risposta]</li>
                        </ul>
                    </section>

                    <section className={styles.terms}>
                        <h2>Termini e Condizioni</h2>
                        <p>Leggi i nostri <a href="[link ai termini]" target="_blank" rel="noopener noreferrer">termini di servizio</a> e <a href="[link alla privacy]" target="_blank" rel="noopener noreferrer">politica sulla privacy</a>.</p>
                    </section>

                    <section className={styles.feedback}>
                        <h2>Feedback e Suggerimenti</h2>
                        <p>Hai suggerimenti? <a href="[link al modulo di feedback]" target="_blank" rel="noopener noreferrer">Compila questo modulo</a>.</p>
                    </section>

                    <section className={styles.team}>
                        <h2>Chi Siamo</h2>
                        <p>[Brevi biografie o descrizione del team].</p>
                    </section>

                    <section className={styles.credits}>
                        <h2>Riconoscimenti</h2>
                        <p>Grazie a [crediti a risorse esterne].</p>
                    </section>
                </div>
            </WindowBox>
        </div>
    );
}

export default InfoPage;
