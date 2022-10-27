import React, { useState, useEffect, useRef } from "react"
import styles from "./styles.module.css"

const Dictaphone = () => {
  const [isRecording, setisRecording] = useState(false)
  const [note, setNote] = useState(null)
  const [notesStore, setnotesStore] = useState([])

  const microphone = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    microphone.current = new SpeechRecognition()
  
    microphone.current.continuous = true
    microphone.current.interimResults = true
    microphone.current.lang = "hu-HU"
  }, [])

  useEffect(() => {
    startRecordController()
  }, [isRecording])

  const startRecordController = () => {
    if (isRecording) {
      microphone.current.start()
      microphone.current.onend = () => {
        microphone.current.start()
      }
    } else {
      microphone.current.stop()
      microphone.current.onend = () => {
        console.log("Stopped microphone on Click")
      }
    }
    microphone.current.onstart = () => {
      console.log("microphones on")
    }
  
    microphone.current.onresult = (event) => {
      const recordingResult = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")
      setNote(recordingResult)
      microphone.current.onerror = (event) => {
        console.log(event.error)
      }
    }
  }
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
          <button onClick={() => setisRecording((prevState) => !prevState)}>
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