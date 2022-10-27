import React, { useEffect, useRef, useState } from "react";
import styles from './styles.module.css';


const Speech = () => {
  const synth = useRef(null) 
  const [text, setText] = useState('')
  
  useEffect(() => {
    synth.current = window.speechSynthesis;
  }, [])

  const handleStart = () => {
    const speakText = new SpeechSynthesisUtterance(text)
    speakText.voice = synth.current.getVoices().find(({name}) => name === 'Mariska')
    synth.current.speak(speakText)
  }


  const handleStop = () => {
    synth.current.cancel();
  }

  const handleInputChange = ({ target }) => {
    setText(target.value)
  }


  return (
    <div className="parent">
      <h1 className="heading">Szövegből beszéd</h1>

      <textarea
        className={styles.textarea}
        placeholder="Írd ide a szöveget"
        onChange={handleInputChange}
      ></textarea>

      <div className="btnparent">
        <button className="btn" onClick={handleStart}>
          Beszélj
        </button>

        <button className="btn" onClick={handleStop}>
          Állj
        </button>
      </div>
    </div>
  )
}

export default Speech
