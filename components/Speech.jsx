import { useState } from "react";
import useSpeech from "../hooks/useSpeech";
import styles from './styles.module.css';


const Speech = () => {
  const [text, setText] = useState('')
  
  const { startSpeaking, handleStop } = useSpeech()

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
      />

      <div className="btnparent">
        <button className="btn" onClick={() => startSpeaking(text)}>
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
