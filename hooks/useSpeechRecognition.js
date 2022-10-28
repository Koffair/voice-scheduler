import { useState, useEffect, useRef } from "react"

const useSpeechRecognition = ({
  onStopped = () => {},
  onStarted = () => {},
  onResult = () => {},
  onError = (errorEvent) => {}
}) => {
  const microphone = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    microphone.current = new SpeechRecognition()
  
    microphone.current.continuous = true
    microphone.current.interimResults = true
    microphone.current.lang = "hu-HU"
  }, [])

  const [isRecording, setisRecording] = useState(false)

  const startStopRecording = () => {
    setisRecording((prevState) => !prevState)
  }

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
        onStopped()
      }
    }
    microphone.current.onstart = () => {
      onStarted()
    }
  
    microphone.current.onresult = (event) => {
      const recordingResult = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")
        onResult(recordingResult)

      microphone.current.onerror = (event) => {
        onError(event.error)
      }
    }
  }  

  return {
    isRecording,
    startStopRecording,
  }
}

export default useSpeechRecognition
