import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "../components/Molecules/Header/Header";
import { labels } from '../data/labels';
import WindowBox from "../components/Organism/WindowBox/WindowBox";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import SelectBox from "../components/Molecules/SelectBox/SelectBox";
import { optionSelect } from "../data/optionSelect";
import Button from '../components/Atom/Button/Button';
import SwitchBox from "../components/Molecules/SwitchBox/SwitchBox";
import Toast from "../components/Atom/Toast/Toast";
import InputBox from "../components/Molecules/InputBox/InputBox";
import Footer from "@/components/Molecules/footer/Footer";
import { IAnswer } from "@/data/types/common";


export default function Home() {
  const [protagonist, setProtagonist] = useState('');
  const [antagonist, setAntagonists] = useState('');
  const [genre, setGenre] = useState('');
  const [response, setResponse] = useState('');
  const [answer, setAnswer] = useState('');
  const [pegi18, setPegi18] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [input, setInput] = useState<IAnswer>({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  });


  const validation = protagonist.trim().length > 0 && antagonist.trim().length > 0 && genre.length > 0;
  const validationQuestion =
    input.question1.trim().length > 0 &&
    input.question2.trim().length > 0 &&
    input.question3.trim().length > 0 &&
    input.question4.trim().length > 0 &&
    input.question5.trim().length > 0;

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(false);
    const prompt = `Genera una storia ${genre}, con un titolo per ${pegi18 ? 'adulti' : 'bambini'} con il protagonista di nome ${protagonist} e l'antagonista di nome ${antagonist}.
    Su questa storia, genera cinque domande di comprensione del testo`;

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paragraphsText = paragraphs.join('\n');
    const questionsText = questions.join('\n');

    const prompt = `Questo è il racconto che hai appena generato:
    ${titles[0]}
    ${paragraphsText}
    ${titles[1]}
    ${questionsText}
    L'utente ha risposto:
    -alla prima domanda ${input.question1}
    -alla seconda domanda ${input.question2}
    -alla terza domanda ${input.question3}
    -alla quarta domanda ${input.question4}
    -alla quinta domanda ${input.question5}.
    Potresti dirmi se sono corrette le risposte?
    `;

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
          setAnswer(data.message);
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
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInput((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
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

  interface IFormatScriptProps {
    script: string;
    setTitles: Dispatch<SetStateAction<string[]>>;
    setQuestions: Dispatch<SetStateAction<string[]>>;
    setParagraphs: Dispatch<SetStateAction<string[]>>;
  }

  function formatScript(props: IFormatScriptProps) {
    const { script, setTitles, setQuestions, setParagraphs } = props;

    if (script) {
      const lines = script.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('##')) {
          const title = line.replace('##', '').trim();
          setTitles((prevState) => [...prevState, title]);

        } else if (line.startsWith('**')) {
          const titleQuestion = line.replace(/\*+/g, '').trim();
          setTitles((prevState) => [...prevState, titleQuestion]);
        }
        else if (
          line.startsWith('1') ||
          line.startsWith('2') ||
          line.startsWith('3') ||
          line.startsWith('4') ||
          line.startsWith('5')) {
          setQuestions((prevQuestions) => [...prevQuestions, line.replace(/\*+/g, '').trim()]);
        } else {
          setParagraphs((prevParagraphs) => [...prevParagraphs, line.replace(/\*+/g, '').trim()]);
        }
      }
    }
  }

  useEffect(() => {
    if (response) {
      formatScript({
        script: response,
        setTitles,
        setQuestions,
        setParagraphs
      })
    }
    if (answer) {
      formatScript({
        script: answer,
        setTitles,
        setQuestions,
        setParagraphs
      })
    }
  }, [response, answer])

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
                <h2>{titles[0]}</h2>
                {paragraphs.map((paragraph, index) => {
                  return (
                    <p key={index}>{paragraph}</p>
                  )
                })}
                <h2>{titles[1]}</h2>
                {questions.map((questions, index) => {
                  return (
                    <p key={index}>{questions}</p>
                  )
                })}
                <div className={styles.container_Voice}>
                  <Button
                    label={'Riproduci'}
                    onClick={handleVoice}
                  />
                  <Button
                    label={'Stop'}
                    onClick={handleStopVoice}
                  />
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                name='question1'
                placeholder={'Rispondi alla prima domanda'}
                onChange={handleChange} // Usa handleChange se vuoi fare altre operazioni oltre a setInput
              />
              <input
                name='question2'
                placeholder={'Rispondi alla seconda domanda'}
                onChange={handleChange} // Usa handleChange se vuoi fare altre operazioni oltre a setInput
              />
              <input
                name='question3'
                placeholder={'Rispondi alla terza domanda'}
                onChange={handleChange} // Usa handleChange se vuoi fare altre operazioni oltre a setInput
              />
              <input
                name='question4'
                placeholder={'Rispondi alla quarta domanda'}
                onChange={handleChange} // Usa handleChange se vuoi fare altre operazioni oltre a setInput
              />
              <input
                name='question5'
                placeholder={'Rispondi alla quinta domanda'}
                onChange={handleChange} // Usa handleChange se vuoi fare altre operazioni oltre a setInput
              />
              <input
                value='Conferma le tue risposte'
                type='submit'
                disabled={!validationQuestion}

              />
            </form>
            {answer && <p>{answer}</p>}


          </WindowBox>
        </div>
        <Footer />
      </main>
    </>
  );
}
