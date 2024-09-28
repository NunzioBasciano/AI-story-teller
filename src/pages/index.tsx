import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { labels } from '../data/labels';
import WindowBox from "../components/Organism/WindowBox/WindowBox";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SelectBox from "../components/Molecules/SelectBox/SelectBox";
import { optionSelect } from "../data/optionSelect";
import Button from '../components/Atom/Button/Button';
import SwitchBox from "../components/Molecules/SwitchBox/SwitchBox";
import Toast from "../components/Atom/Toast/Toast";
import InputBox from "../components/Molecules/InputBox/InputBox";
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
  const [input, setInput] = useState<IAnswer>({ question1: '', question2: '', question3: '', question4: '', question5: '' });

  // Validation function to ensure protagonist, antagonist, and genre are set
  const validation = protagonist.trim().length > 0 && antagonist.trim().length > 0 && genre.length > 0;

  // Validation for answering all questions
  const validationQuestion = Object.values(input).every(value => value.trim().length > 0);

  /**
   * Generates the story based on protagonist, antagonist, and genre.
   * Sends the data to the API endpoint to get the generated story.
   * @async
   * @function handleGenerate
   * @returns {Promise<void>} 
   */
  const handleGenerate = async (): Promise<void> => {
    if (!validation) return;

    setIsLoading(true);
    setError(false);
    const prompt = `Genera una storia ${genre}, con un titolo per ${pegi18 ? 'adulti' : 'bambini'} con il protagonista di nome ${protagonist} e l'antagonista di nome ${antagonist}.
    Su questa storia, genera cinque domande di comprensione del testo`;

    if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
      try {
        const response = await fetch('/api/generate', {
          headers: { "Content-Type": "application/json" },
          method: 'POST',
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) throw new Error('Something went wrong with the server response');

        const data = await response.json();
        setResponse(data.message);
      } catch (e) {
        console.error('Something went wrong!', e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  /**
 * Submits the user's answers to the API for validation and correctness.
 * Sends the generated story, questions, and answers to the backend for evaluation.
 * @async
 * @param {FormEvent<HTMLFormElement>} e - The form submission event.
 * @returns {Promise<void>} 
 */
  const handleAnswer = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
    Potresti dirmi se sono corrette le risposte?`;

    if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
      try {
        const response = await fetch('/api/generate', {
          headers: { "Content-Type": "application/json" },
          method: 'POST',
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) throw new Error('Something went wrong with the server response');
        const data = await response.json();
        setAnswer(data.message);
      } catch (e) {
        console.error('Something went wrong!', e);
        setError(true);
      }
    }
  };

  /**
  * Handles input change for the answers to the story's questions.
  * @param {ChangeEvent<HTMLInputElement>} e - The input change event.
  * @returns {void}
  */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  /**
   * Starts the voice playback of the generated story.
   * Uses Web Speech API to speak the generated story aloud.
   * @returns {void}
   */
  const handleVoice = (): void => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'it-IT';
    speechSynthesis.speak(utterance);
  };

  /**
 * Stops the voice playback of the story.
 * Cancels the current speech synthesis.
 * @returns {void}
 */
  const handleStopVoice = (): void => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  /**
   * Formats the generated text into separate titles, paragraphs, and questions.
   * Parses the story and questions from the API response and sets them accordingly.
   * @param {string} script - The generated story and questions as a string.
   * @returns {void}
   */
  const formatScript = (script: string): void => {
    const lines = script.split('\n');
    const newTitles: string[] = [];
    const newParagraphs: string[] = [];
    const newQuestions: string[] = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('##')) {
        // Rimuove i ## dai titoli
        newTitles.push(trimmedLine.replace('##', '').trim());
      } else if (trimmedLine.startsWith('**')) {
        // Rimuove sia i ** all'inizio che alla fine dei titoli
        newTitles.push(trimmedLine.replace(/\*\*/g, '').trim());
      } else if (trimmedLine.match(/^\d/)) {
        // Rimuove sia i ** all'inizio che alla fine delle domande numerate
        newQuestions.push(trimmedLine.replace(/\*\*/g, '').trim());
      } else if (trimmedLine.length > 0) {
        // Aggiunge paragrafi senza modifiche
        newParagraphs.push(trimmedLine.trim());
      }
    });

    setTitles(newTitles);
    setParagraphs(newParagraphs);
    setQuestions(newQuestions);
  };



  // useEffect to reformat the generated story whenever the response changes
  useEffect(() => {
    if (response) formatScript(response);
  }, [response]);

  return (
    <>
      <Head>
        <title>{labels.titlePageLabel}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.content}>
        {error && <Toast
          title={'Errore nella digitazione'}
          message={'Qualcosa è andato storto con l\'operazione che hai lanciato'}
          setAction={setError}
        />}

        <WindowBox title={labels.storyParamsLabel}>
          {/* Sezione input per protagonista, antagonista e genere */}
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
          </div>

          {/* Sezione switch per PEGI 18 e bottone per generare */}
          <div className={styles.container_switchButton}>
            <SwitchBox
              label={labels.childOrAdultLabel}
              setValue={setPegi18}
              value={pegi18}
            />
            <Button
              label={labels.buttonParamsLabel}
              onClick={handleGenerate}
              disabled={!validation}
            />
          </div>

          {/* Rendering della storia generata */}
          {isLoading && <div className={styles.loading}>Il risultato è in caricamento</div>}
          {!isLoading && response && (
            <div className={styles.container_story}>
              <h2 >{titles[0]}</h2>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <h2 className={styles.title_answer}>{titles[1]}</h2>
              {questions.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
              <div className={styles.container_Voice}>
                <Button label={'Riproduci'} onClick={handleVoice} />
                <Button label={'Stop'} onClick={handleStopVoice} />
              </div>
            </div>
          )}

          {/* Sezione per rispondere alle domande */}
          {response && (
            <form className={styles.formQuestion} onSubmit={handleAnswer}>
              {Object.keys(input).map((key, index) => (
                <InputBox
                  key={index}
                  label={`Domanda ${index + 1}`}
                  placeholder={`Rispondi alla domanda ${index + 1}`}
                  setValue={(value) => handleChange({ target: { name: key, value } } as ChangeEvent<HTMLInputElement>)}
                  value={input[key as keyof IAnswer]}
                />
              ))}
              <Button label={'Conferma'} disabled={!validationQuestion} />
            </form>
          )}

          {/* Rendering della valutazione delle risposte */}
          {answer && (
            <div className={styles.container_story}>
              <h2>Valutazione delle risposte:</h2>

              <div >
                <h3>Domanda 1: Dove amava giocare Pippo?</h3>
                <p><strong>Risposta corretta:</strong> Nel bosco dietro casa.</p>
                <p><strong>Tua risposta:</strong> {input.question1}</p>
                <p><strong>Feedback:</strong> La tua risposta è errata.</p>
              </div>

              <div >
                <h3>Domanda 2: Cosa vide Pippo nel bosco?</h3>
                <p><strong>Risposta corretta:</strong> Un cane nero enorme con occhi rossi fiammeggianti.</p>
                <p><strong>Tua risposta:</strong> {input.question2}</p>
                <p><strong>Feedback:</strong> La tua risposta è errata.</p>
              </div>

              <div >
                <h3>Domanda 3: Cosa stava facendo Pluto nel giardino di Pippo?</h3>
                <p><strong>Risposta corretta:</strong> Stava scavando una buca sotto un vecchio albero e ci stava mettendo qualcosa dentro.</p>
                <p><strong>Tua risposta:</strong> {input.question3}</p>
                <p><strong>Feedback:</strong> La tua risposta è errata.</p>
              </div>

              <div >
                <h3>Domanda 4: Cosa trovò Pippo in giardino la mattina dopo?</h3>
                <p><strong>Risposta corretta:</strong> Un uomo magro con la pelle grigia e gli occhi vuoti, legato ad un albero con una corda.</p>
                <p><strong>Tua risposta:</strong> {input.question4}</p>
                <p><strong>Feedback:</strong> La tua risposta è errata.</p>
              </div>

              <div >
                <h3>Domanda 5: Cosa cambiò per Pippo dopo aver incontrato Pluto?</h3>
                <p><strong>Risposta corretta:</strong> Il bosco non fu più lo stesso per lui, perché aveva imparato che anche i luoghi più belli possono nascondere segreti oscuri.</p>
                <p><strong>Tua risposta:</strong> {input.question5}</p>
                <p><strong>Feedback:</strong> La tua risposta è errata.</p>
              </div>

              <div className={styles.overall_feedback}>
                <p><strong>Valutazione generale:</strong> Le risposte che hai fornito sono casuali e non hanno senso nel contesto del racconto.</p>
              </div>
            </div>
          )}

        </WindowBox>
      </div>
    </>
  );
}
