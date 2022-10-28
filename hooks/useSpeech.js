import React, { useEffect, useRef } from "react";

const useSpeech = () => {
  const synth = useRef(null) 
  
  useEffect(() => {
    synth.current = window.speechSynthesis
  }, [])

  const startSpeaking = (text) => {
    const speakText = new SpeechSynthesisUtterance(text)
    speakText.voice = synth.current.getVoices().find(({name}) => name === 'Mariska')
    synth.current.speak(speakText)
  }

  const stopSpeaking = () => {
    synth.current.cancel()
  }

  return {
    startSpeaking,
    stopSpeaking,
  }
}

export default useSpeech
