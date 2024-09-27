import { useState } from 'react';
import style from './contact.module.scss'
import InputBox from '@/components/Molecules/InputBox/InputBox';
import WindowBox from '@/components/Organism/WindowBox/WindowBox';
import styles from "@/styles/Home.module.scss";
import Button from '@/components/Atom/Button/Button';

function ContactForm() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        phone: '',
        company: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value // Aggiorna il campo specifico nell'oggetto
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Invia i dati del modulo a un'API o gestiscili come preferisci
    };

    return (
        <div className={styles.content}>
            <WindowBox
                title={'Contacts'}
            >
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.nameSection}>
                        <InputBox
                            label="Nome"
                            placeholder="Inserisci il tuo nome"
                            value={formData.firstName}
                            setValue={(value) => handleChange({ target: { name: 'firstName', value } } as React.ChangeEvent<HTMLInputElement>)}
                        />
                        <InputBox
                            label="Cognome"
                            placeholder="Inserisci il tuo cognome"
                            value={formData.lastName}
                            setValue={(value) => handleChange({ target: { name: 'lastName', value } } as React.ChangeEvent<HTMLInputElement>)}
                        />
                    </div>
                    <InputBox
                        label="Azienda"
                        placeholder="Inserisci il nome della tua azienda"
                        value={formData.company}
                        setValue={(value) => handleChange({ target: { name: 'company', value } } as React.ChangeEvent<HTMLInputElement>)}
                    />
                    <InputBox
                        inputType={'email'}
                        label="Email"
                        placeholder="Inserisci la tua email"
                        value={formData.email}
                        setValue={(value) => handleChange({ target: { name: 'email', value } } as React.ChangeEvent<HTMLInputElement>)}
                    />
                    <InputBox
                        inputType={'number'}
                        label="Numero di Telefono"
                        placeholder="Inserisci il tuo numero di telefono"
                        value={formData.phone}
                        setValue={(value) => handleChange({ target: { name: 'phone', value } } as React.ChangeEvent<HTMLInputElement>)}
                    />
                    <InputBox
                        inputType={'textarea'}
                        label="Messaggio"
                        placeholder="Scrivi il tuo messaggio"
                        value={formData.message}
                        setValue={(value) => handleChange({ target: { name: 'message', value } } as React.ChangeEvent<HTMLInputElement>)}
                    />
                    <Button >
                        Invia
                    </Button>
                </form>
            </WindowBox>
        </div>
    );
}

export default ContactForm;
