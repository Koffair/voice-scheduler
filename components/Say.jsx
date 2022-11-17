import { useEffect, useRef, useState } from 'react'
import useSpeech from '../hooks/useSpeech'

const Say = ({ text = '', children, autoStart }) => {
  const { startSpeaking, stopSpeaking } = useSpeech()
  const started = useRef(false)
  const [finished, setFinished] = useState(false)

  const handleFinish = () => {
    setFinished(true)
  }

  useEffect(() => {
    if (autoStart && !started.current) {
      started.current = true
      startSpeaking(text, handleFinish)
    }
  }, [autoStart])

  return (
    <>
      {finished && children}
    </>
  )
}

export default Say