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
  onToggleRecording = (isRecording) => {},
  onResult = () => {},
  onError = (errorEvent) => {},
  options = {},
  expected = [],
}) => {
  const recognition = useRef(null)

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
    
    recognition.current.onstart = () => {
      onToggleRecording(true)
    }

    recognition.current.onend = () => {
      onToggleRecording(false)
    }  

  }

  return {
    recognition,
  }
}

export default useSpeechRecognition
