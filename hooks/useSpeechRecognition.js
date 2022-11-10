import { useState, useEffect, useRef } from "react"

const defaultOptions = {
  continuous: true,
  interimResults: true,
  lang: "en-US"
}

function intersect(a, b) {
  var setA = new Set(a)
  var setB = new Set(b)
  var intersection = new Set([...setA].filter(x => setB.has(x)))
  return Array.from(intersection)
}

const useSpeechRecognition = ({
  onStopped = () => {},
  onStarted = () => {},
  onResult = () => {},
  onError = (errorEvent) => {},
  options = {},
  expected = []
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

  const stopRecording = () => {
    setisRecording(false)
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
        .map((result) => result.transcript.toLowerCase().trim())

        if (expected?.length) {
          const expectedResultIntersection = intersect(expected, recordingResult)

          if (expectedResultIntersection.length > 0) {
            recognition.current.stop()
            stopRecording()
          }
          onResult(expectedResultIntersection)
        } else {
          onResult(recordingResult.join(""))
        }

      recognition.current.onerror = (event) => {
        onError(event.error)
      }
    }
  }  

  return {
    isRecording,
    toggleRecording,
    setisRecording,
    stopRecording,
  }
}

export default useSpeechRecognition
