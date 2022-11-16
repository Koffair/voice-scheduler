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
  // onStopped = () => {},
  onStarted = () => {},
  onResult = () => {},
  onError = (errorEvent) => {},
  options = {},
  expected = [],
  autoStart = false,
}) => {
  const recognition = useRef(null)
  const recognitionStatus = useRef({ isRecording: false })
  // const [isRecording, setisRecording] = useState(autoStart)

  // useEffect(() => {
  if (!recognition.current){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition.current = new SpeechRecognition()
    Object.entries({ ...defaultOptions, ...options }).forEach(([key, value]) => {
      recognition.current[key] = value
    })

    recognition.current.onresult = (event) => {
      const recordingResult = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript.toLowerCase().trim())

      console.log(recordingResult)

      if (expected?.length) {
        const expectedResultIntersection = intersect(expected, recordingResult)

        if (expectedResultIntersection.length > 0) {
          console.log('stop')
          recognition.current.stop()
        }
        onResult(expectedResultIntersection)
      } else {
        onResult(recordingResult.join(""))
      }
    }    
  }

    // recognition.current.onstart = () => {
    //   recognitionStatus.current.isRecording = true
    //   onStarted()
    //   setisRecording(true)
    // }

    // recognition.current.onend = () => {
    //   recognitionStatus.current.isRecording = false
    //   setisRecording(false)
    // }    
  // }, [])


  // const startRecordController = () => {
  //   console.log(recognition.current)
  //   if (isRecording) {
  //     recognition.current.start()
  //     // recognition.current.onend = () => {
  //     //   console.log('talk ended by silence')
  //     //   recognition.current.start()
  //     // }
  //   // } else {
  //     recognition.current.stop()
  //     recognition.current.onend = () => {
  //       onStopped()
  //     }
  //   // }


  

  // }  

  return {
    // isRecording,
    recognition,
    recognitionStatus,
    // toggleRecording,
    // setisRecording,
    // stopRecording,
  }
}

export default useSpeechRecognition
