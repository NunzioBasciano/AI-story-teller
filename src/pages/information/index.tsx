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
                        <p>AI Story Teller ti consente di generare storie in base ai personaggi e al genere che scegli. Segui le istruzioni di seguito per iniziare.</p>
                    </section>

                    <section className={styles.features}>
                        <h2>Come Usare l&apos;Applicazione</h2>
                        <ul>
                            <li>
                                <strong>Inserisci i Personaggi:</strong> Compila i campi con il nome del protagonista e dell&apos;antagonista.
                            </li>
                            <li>
                                <strong>Seleziona il Genere:</strong> Scegli il genere della storia dal menu a discesa.
                            </li>
                            <li>
                                <strong>Scegli la Categoria:</strong> Indica se la storia è per adulti o bambini utilizzando l&apos;interruttore.
                            </li>
                            <li>
                                <strong>Genera la Storia:</strong> Clicca sul pulsante per generare la storia.
                            </li>
                            <li>
                                <strong>Rispondi alle Domande:</strong> Dopo aver generato la storia, rispondi alle domande di comprensione del testo.
                            </li>
                        </ul>
                    </section>

                    <div className={styles.contacts}>
                        <h2>Contattaci</h2>
                        <p>
                            Se hai domande o suggerimenti, non esitare a contattarci all&apos;indirizzo email:
                            <a href="https://mail.google.com/mail/u/0/#inbox?compose=new"> nunzio.basciano1988@gmail.com</a>.
                        </p>
                    </div>

                    <div className={styles.legal}>
                        <h2>Informazioni Legali</h2>
                        <p>
                            Questa applicazione è un progetto di esempio per dimostrare l&apos;uso di Next.js e React.
                            Tutti i diritti riservati.
                        </p>
                    </div>
                </div>
            </WindowBox>
        </div>
    );
}

export default InfoPage;
