import React, { useState } from "react"
import useSpeechRecognition from "../hooks/useSpeechRecognition"
import styles from "./styles.module.css"

const Dictaphone = () => {
  const [note, setNote] = useState(null)
  const [notesStore, setnotesStore] = useState([])

  const {
    startStopRecording,
    isRecording
  } = useSpeechRecognition({
    onResult: setNote
  })

  const storeNote = () => {
    setnotesStore([...notesStore, note])
    setNote("")
  }

  return (
    <>
      <h1>Rögzíts hangjegyzetet</h1>
      <div>
        <div className={styles.noteContainer}>
          <h2>Hangjegyzet</h2>
          <button className="button" onClick={storeNote} disabled={!note || isRecording}>
            Mentés
          </button>
          <button onClick={startStopRecording}>
            {isRecording ? "Állj" : "Rögzítés"}
          </button>
          {" "}
          {isRecording ? <span>Felvétel folyamatban... </span> : <span>Megállítva </span>}
          <p>{note}</p>
        </div>
        <div className={styles.noteContainer}>
          <h2>Elmentett jegyzetek</h2>
          <p>{notesStore}</p>
        </div>
      </div>
    </>
  )
}

export default Dictaphone