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
        console.log("continue..")
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
      <h1>Record Voice Notes</h1>
      <div>
        <div className={styles.noteContainer}>
          <h2>Record Note Here</h2>
          {isRecording ? <span>Recording... </span> : <span>Stopped </span>}
          <button className="button" onClick={storeNote} disabled={!note}>
            Save
          </button>
          <button onClick={() => setisRecording((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className={styles.noteContainer}>
          <h2>Notes Store</h2>
        </div>
      </div>
    </>
  )
}

export default Dictaphone