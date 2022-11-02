import{ useEffect, useRef } from "react";

const useSpeech = () => {
  const synth = useRef(null)
  
  useEffect(() => {
    synth.current = window.speechSynthesis
  }, [])

  const startSpeaking = (text, onEnd = console.log) => {
    const speak = new SpeechSynthesisUtterance(text)
    // speak.voice = synth.current.getVoices().find(({name}) => name === 'Mariska')
    speak.lang = 'en-US'
    speak.voice = speechSynthesis.getVoices().find((voice) => voice.lang === 'en-US')
    speak.onend = () => onEnd(speak.text)
    synth.current.speak(speak)
  }

  const stopSpeaking = () => {
    synth.current.cancel()
  }

  const say = (text) => new Promise(resolve => {
    startSpeaking(text, resolve)
  })

  return {
    startSpeaking,
    stopSpeaking,
    say
  }
}

export default useSpeech
