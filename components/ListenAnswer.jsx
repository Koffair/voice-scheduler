import React from "react"
import useSpeechRecognition from "../hooks/useSpeechRecognition"
import styles from "./styles.module.css"

const ListenAnswer = ({ useText, setText, expected }) => {
  const text = useText()

  const {
    toggleRecording,
    isRecording,
  } = useSpeechRecognition({
    onResult: setText,
    expected: Array.isArray(expected) ? expected : [expected],
  })

  return (
    <>
      <h1>Rögzíts hangjegyzetet</h1>
      <div>
        <div className={styles.noteContainer}>
          <h2>Hangjegyzet</h2>
          <button onClick={toggleRecording}>
            {isRecording ? "Állj" : "Rögzítés"}
          </button>
          {" "}
          {isRecording ? <span>Felvétel folyamatban... </span> : <span>Megállítva </span>}
          <p>{text}</p>
        </div>
      </div>
    </>
  )
}

export default ListenAnswer