import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import { labels } from '../data/labels'
import WindowBox from "../components/Organism/WindowBox/WindowBox";
import Footer from '../components/Molecules/Footer/Footer';
import InputBox from '../components/Molecules/InputBox/InputBox';
import { useState } from "react";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { optionSelect } from "@/data/optionSelect";
import Button from "@/components/Atom/Button/Button";

export default function Home() {
  const [protagonist, setProtagonist] = useState('');
  const [antagonist, setAntagonists] = useState('');
  const [genre, setGenre] = useState('');

  const handleGenerate = () => {
    console.log({ protagonist, antagonist, genre })
  }

  return (
    <>
      <Head>
        <title>{labels.titlePageLabel}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header
          title={labels.titlePageLabel}
        />
        <div className={styles.content}>
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
              <div className={styles.container_button}>
                <Button
                  label={labels.buttonParamsLabel}
                  onClick={handleGenerate}
                />
              </div>
            </div>
          </WindowBox>
        </div>
        <Footer />
      </main>
    </>
  );
}
