import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "../components/Molecules/Header/Header";
import { labels } from '../data/labels';
import WindowBox from "../components/Organism/WindowBox/WindowBox";
import Footer from '../components/Molecules/Footer/Footer';
import InputBox from '../components/Molecules/InputBox/InputBox';
import { useState } from "react";
import SelectBox from "../components/Molecules/SelectBox/SelectBox";
import { optionSelect } from "../data/optionSelect";
import Button from '../components/Atom/Button/Button';
import SwitchBox from "../components/Molecules/SwitchBox/SwitchBox";
import Toast from "../components/Atom/Toast/Toast";
import { footerLinks } from "../data/footerLinks";
/* prova */
export default function Home() {
  const [protagonist, setProtagonist] = useState('');
  const [antagonist, setAntagonists] = useState('');
  const [genre, setGenre] = useState('');
  const [response, setResponse] = useState('');
  const [pegi18, setPegi18] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const validation = protagonist.trim().length > 0 && antagonist.trim().length > 0 && genre.length > 0;

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(false);
    const prompt = `Genera una storia ${genre}, per ${pegi18 ? 'adulti' : 'bambini'} con il protagonista di nome ${protagonist} e l'antagonista di nome ${antagonist}`;

    if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
      if (validation) {
        try {
          const response = await fetch('/api/generate',
            {
              headers: { "Content-Type": "application/json" },
              method: 'POST',
              body: JSON.stringify({ prompt }),
            });
          const data = await response.json();

          if (!response.ok) {
            throw new Error('Something went wrong with the server response');
          }
          setResponse(data.message);
        } catch (e) {
          console.log('Something get wrong!', e);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        throw new Error('Validation failed');
      }
    }
  }

  const handleVoice = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'it-IT';
    speechSynthesis.speak(utterance);
  };

  const handleStopVoice = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <>
      <Head>
        <title>{labels.titlePageLabel}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header
          title={labels.titlePageLabel}
        />
        <div className={styles.content}>
          {error && <Toast
            title={'Errore nella digitazione'}
            message={'Qualcosa è andato storto con l\'operazione che hai lanciato'}
            setAction={setError}
          />}
          <WindowBox
            title={labels.storyParamsLabel}
          >
            <div className={styles.input_container}>
              <InputBox
                label={labels.protagonistLabel}
                placeholder={labels.setProtagonistLabel}
                setValue={setProtagonist}
                value={protagonist}
              />
              <InputBox
                label={labels.antagonistLabel}
                placeholder={labels.setAntagonistLabelLabel}
                setValue={setAntagonists}
                value={antagonist}
              />
              <SelectBox
                label={labels.genresLabel}
                list={optionSelect}
                setAction={setGenre}
              />
              <div className={styles.container_switch}>
                <SwitchBox
                  label={labels.childOrAdultLabel}
                  setValue={setPegi18}
                  value={pegi18}
                />
              </div>
              <div className={styles.container_button}>
                <Button
                  label={labels.buttonParamsLabel}
                  onClick={handleGenerate}
                  disabled={!validation}
                />
              </div>
            </div>
            {isLoading && <div className={styles.loading}>Il risultato è in caricamento</div>}

            {!isLoading && response && (
              <div className={styles.container_story}>
                <Button
                  label={'Riproduci'}
                  onClick={handleVoice}
                />
                <Button
                  label={'Stop'}
                  onClick={handleStopVoice}
                />
                {response}
              </div>
            )}

          </WindowBox>
        </div>
        <Footer
          list={footerLinks}
        />
      </main>
    </>
  );
}
