# AI Story Teller

AI Story Teller è un'applicazione web che utilizza l'intelligenza artificiale per generare storie coinvolgenti. L'utente può inserire parole chiave, scegliere il genere della storia, specificare se la storia è per adulti o bambini e ottenere racconti unici e creativi in pochi istanti. L'applicazione offre anche una funzionalità di sintesi vocale e un sistema di domande di comprensione per verificare le risposte degli utenti.


### Caratteristiche

- **Generazione di Storie**: Inserisci parole chiave e seleziona il genere per generare storie personalizzate.
- **Scelta dell'Età**: L'utente può scegliere se la storia generata è per adulti o bambini.
- **Domande di Comprensione**: Dopo la generazione della storia, l'utente può rispondere a domande di comprensione del testo.
- **Verifica delle Risposte**: Le risposte degli utenti vengono verificate utilizzando l'analisi di Gemini.
- **Sintesi Vocale**: La storia può essere letta ad alta voce grazie alla sintesi vocale.
- **Interfaccia Intuitiva**: Un design semplice e pulito che rende facile l'interazione con l'app.
- **Salvataggio Storie**: Gli utenti possono salvare le storie generate per un uso futuro.


### Tecnologie Utilizzate

* Linguaggio di Programmazione: TypeScript
* Framework: Next.js
* API di Generazione Contenuti: Google Gemini
* Librerie: @google/generative-ai


### Link Vercel

https://ai-story-teller-ecru.vercel.app/


### Utilizzo

1. Avvia l'applicazione.
2. Inserisci un prompt, seleziona un genere e specifica se la storia deve essere per adulti o bambini.
3. Clicca su "Genera Storia" per ottenere la tua narrazione personalizzata.
4. Ascolta la storia generata utilizzando i pulsanti di sintesi vocale.
5. Rispondi alle domande di comprensione del testo
6. Verifica se le tue risposte sono corrette mediante l'analisi di Gemini

## Funzionalità

### Generazione della Storia

L'applicazione utilizza l'API route /api/generate.ts per comunicare con l'API di Gemini e generare contenuti. Ecco come funziona:

* Metodo: POST
* Corpo della Richiesta: { "prompt": "tuo testo qui" }
* Risposta
    * Successo: { "ok": true, "message": "contenuto generato" }
    * Errore: { "ok": false, "message": "messaggio di errore" }

### Sintesi Vocale

* Riproduci: Legge ad alta voce la storia generata utilizzando la funzione di sintesi vocale del browser.
* Stop: Ferma la riproduzione della sintesi vocale.

### Domande di Comprensione

Dopo la generazione della storia, l'utente riceve domande di comprensione del testo. Le risposte degli utenti vengono inviate all'API di Google Gemini per verificare la loro accuratezza. Questa funzionalità consente agli utenti di testare la loro comprensione e ricevere un feedback immediato.

## API Route

Ecco come è strutturata l'API route /api/generate.ts:

```javascript
import type { NextApiRequest, NextApiResponse } from "next";
import { GenerateContentCandidate, GoogleGenerativeAI } from "@google/generative-ai";

type IBody = {
    prompt: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method === 'POST') {
        const { prompt } = req.body as IBody;
        if (!prompt) {
            return res.status(400).json({ ok: false, message: 'Missing body' });
        }

        try {
            if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
                const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
                const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const result = await model.generateContent(prompt);
                const output = (
                    result.response.candidates as GenerateContentCandidate[]
                )[0].content.parts[0].text;

                if (output) {
                    return res.status(200).json({ ok: true, message: output });
                } else {
                    return res.status(400).json({ ok: false, message: 'No output generated' });
                }
            } else {
                return res.status(500).json({ ok: false, message: "Something went wrong contact the manufacturer!" });
            }
        } catch (e) {
            console.error(e);
            return res.status(400).json({ ok: false, message: "Error during generation" });
        }
    } else {
        return res.status(405).json({ ok: false, message: "Method not allowed" });
    }
}
```

## Contribuire

Se desideri contribuire al progetto, apri una pull request o segnala problemi tramite le Issue.

## Licenza

Questo progetto è concesso in licenza sotto la Licenza MIT - vedere il file LICENSE per i dettagli.

## Contatti

Per domande o suggerimenti, puoi contattarmi via email a [nunzio.basciano1988@gmail.com].






