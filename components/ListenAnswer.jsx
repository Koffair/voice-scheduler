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
  const [responses, setResponses] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const started = useRef(false)

  const {
    recognition,
  } = useSpeechRecognition({
    onToggleRecording: setIsRecording,
    onResult: setResponses,
    expected: Array.isArray(expected) ? expected : [expected],
  })

  useEffect(() => {
    if (autoStart && recognition.current?.start && !started.current && !responses.length) {
      started.current = true
      recognition.current?.start()
    }
  }, [autoStart, recognition])

  return (
    <>
      {isRecording && <div>Listening...</div>}
      <div>
        {trigger({ isRecording, recognition })}
        {children({ responses })}
      </div>
    </>
  )
}

export default ListenAnswer