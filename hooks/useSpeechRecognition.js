import { useState, useEffect, useRef } from "react"

const defaultOptions = {
  continuous: true,
  interimResults: true,
  lang: "hu-HU"
}

const useSpeechRecognition = ({
  onStopped = () => {},
  onStarted = () => {},
  onResult = () => {},
  onError = (errorEvent) => {},
  options = {}
}) => {
  const recognition = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition.current = new SpeechRecognition()
    Object.entries({ ...defaultOptions, ...options }).forEach(([key, value]) => {
      recognition.current[key] = value
    })
  }, [])

  const [isRecording, setisRecording] = useState(false)

  const toggleRecording = () => {
    setisRecording((prevState) => !prevState)
  }

  useEffect(() => {
    startRecordController()
  }, [isRecording])

  const startRecordController = () => {
    if (isRecording) {
      recognition.current.start()
      // recognition.current.onend = () => {
      //   console.log('talk ended by silence')
      //   recognition.current.start()
      // }
    } else {
      recognition.current.stop()
      recognition.current.onend = () => {
        onStopped()
      }
    }
    recognition.current.onstart = () => {
      onStarted()
    }
  
    recognition.current.onresult = (event) => {
      const recordingResult = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")
        onResult(recordingResult)

      recognition.current.onerror = (event) => {
        onError(event.error)
      }
    }
  }  

  return {
    isRecording,
    toggleRecording,
    setisRecording
  }
}

export default useSpeechRecognition
