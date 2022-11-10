import React, { useState } from "react"
import useSpeechRecognition from "../hooks/useSpeechRecognition"
import styles from "./styles.module.css"

import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";

const [textChange$, setText] = createSignal()

const [useText, text$] = bind(textChange$, "")

const Dictaphone = () => {
  const text = useText()

  const {
    toggleRecording,
    isRecording
  } = useSpeechRecognition({
    onResult: setText
  })

  // const storeNote = () => {
  //   setnotesStore([...notesStore, note])
  //   setText("")
  // }

  return (
    <>
      <h1>Rögzíts hangjegyzetet</h1>
      <div>
        <div className={styles.noteContainer}>
          <h2>Hangjegyzet</h2>
{/*           <button className="button" onClick={storeNote} disabled={!text || isRecording}>
            Mentés
          </button> */}
          <button onClick={toggleRecording}>
            {isRecording ? "Állj" : "Rögzítés"}
          </button>
          {" "}
          {isRecording ? <span>Felvétel folyamatban... </span> : <span>Megállítva </span>}
          <p>{text}</p>
        </div>
{/*         <div className={styles.noteContainer}>
          <h2>Elmentett jegyzetek</h2>
          <p>{notesStore}</p>
        </div> */}
      </div>
    </>
  )
}

export default Dictaphone