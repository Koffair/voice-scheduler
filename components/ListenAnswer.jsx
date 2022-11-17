import React, { useEffect, useState, useRef } from "react"
import useSpeechRecognition from "../hooks/useSpeechRecognition"
import styles from "./styles.module.css"

export const defaultTrigger = ({ isRecording, recognition }) => (
  <>
    <button onClick={() => isRecording ? recognition.current?.stop() : recognition.current?.start()}>
      {isRecording ? "Állj" : "Rögzítés"}
    </button>    
    {" "}
    {isRecording ? <span>Felvétel folyamatban... </span> : <span>Megállítva </span>}
  </>
)

const ListenAnswer = ({
  children,
  expected,
  autoStart = false,
  trigger = () => null
}) => {
  const [textArray, setTextArray] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const started = useRef(false)

  const {
    recognition,
  } = useSpeechRecognition({
    onToggleRecording: setIsRecording,
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
      <div>
        {trigger({ isRecording, recognition })}
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
    </>
  )
}

export default ListenAnswer