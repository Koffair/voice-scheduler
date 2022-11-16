import React, { useEffect, useState, useRef } from "react"
import useSpeechRecognition from "../hooks/useSpeechRecognition"
import styles from "./styles.module.css"

const ListenAnswer = ({
  children,
  expected,
  autoStart = false,
  trigger = ({ isRecording, recognition }) => (
    <>
      <button onClick={() => recognition.current?.start()}>
        {isRecording ? "Állj" : "Rögzítés"}
      </button>    
      {" "}
      {isRecording ? <span>Felvétel folyamatban... </span> : <span>Megállítva </span>}
    </>
  )
}) => {
  const [textArray, setTextArray] = useState([])
  const started = useRef(false)

  const {
    recognition,
    // isRecording,
    recognitionStatus,
  } = useSpeechRecognition({
    onResult: setTextArray,
    expected: Array.isArray(expected) ? expected : [expected],
  })

  useEffect(() => {
    if (autoStart && recognition.current?.start && !started.current && !textArray.length) {
      started.current = true
      console.log('start')
      recognition.current?.start()
    }
  }, [autoStart, recognition])

  return (
    <>
      {console.log('render')}
      <h1>Rögzíts hangjegyzetet</h1>
      <div>
        <div className={styles.noteContainer}>
          <h2>Hangjegyzet</h2>
          {/* {trigger({ isRecording, recognition })} */}
          {(textArray.includes(expected) || textArray.includes(expected[0])) && (
            <>
              {children[0]}
            </>
          )}
          {textArray.includes(expected[1]) && (
            <>
              {children[1]}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ListenAnswer