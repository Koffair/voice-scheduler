import React, { useState, useEffect, useRef } from 'react'
import ICalendarLink from "react-icalendar-link";
import useFlow from '../../hooks/useFlow'
import useSpeech from "../../hooks/useSpeech"
import useSpeechRecognition from '../../hooks/useSpeechRecognition'

const slots = [
  { start: "2022-11-09T09:00:00+01:00" },
  { start: "2022-11-11T15:00:00+01:00" },
  { start: "2022-11-12T12:00:00+01:00" },
]

const steps = {
  IDLE: 'Idle',
  WELCOME: 'Welcome text',
  OFFERING: 'Offering slots',
  SLOT_SELECTED: 'Asking for confirmation',
  NOT_CHOOSEN: 'No slots left and no slots has been choosen',
}

const getReadableDateTime = (timeString, locale = 'en-US') => {
  const date = new Date(timeString)
  const day = date.toGMTString().split(' ').slice(0, 3).join(' ') // TODO: GTM only works in en-US. Need further enhancement with localetimestrind
  const time = date.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric' })
  return `${day}, ${time}`
}

const Schedule = () => {
  const { say, stopSpeaking } = useSpeech()
  const { wait } = useFlow()

  const [step, setStep] = useState('IDLE')
  const [isCalling, setIsCalling] = useState(false)
  const [userAnswer, setUserAsnwer] = useState('')
  const [offeredSlotIndex, setOfferedSlotIndex] = useState(null)
  const [selectedSlot, setselectedSlot] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const {
    setisRecording,
    isRecording
  } = useSpeechRecognition({
    onResult: setUserAsnwer, // TODO: have to throttle this as multipl
    options: {
      continuous: false,
      interimResults: false,
    }
  })

  const startListening = () => {
    setUserAsnwer(() => '')
    setisRecording(true)
  }

  const stopListening = () => {
    setUserAsnwer(() => '')
    setisRecording(false)
  }

  useEffect(() => {
    if (offeredSlotIndex !== null && !selectedSlot) {
      if (!slots[offeredSlotIndex]) {
        setStep('NOT_CHOOSEN')
        say('You have not choosen any slot. Good bye.').then(() => {
          stopListening()
          setIsCalling(false)
          setStep('IDLE')
        })
        return
      }

      say(getReadableDateTime(slots[offeredSlotIndex].start))
      .then(() => {
        startListening()
        return wait(3)
      })
      .then(() => {
        stopListening()
        // TODO: it steps one loop cycle forward unnecessarily
        setOfferedSlotIndex(prevIndex => prevIndex + 1)
      })
    }
  }, [offeredSlotIndex])

  const saidYes = () => {
    return ['yes', 'yeah'].includes(userAnswer.toLowerCase())
  }

  useEffect(() => {
    if (step === 'SLOT_SELECTED' && saidYes()) {
      stopListening()
      setConfirmed(true)
      setStep('IDLE')
      say(`Your appointment has been confirmed. See you on ${getReadableDateTime(selectedSlot?.start)}. Good bye.`).then(() => {
        setIsCalling(false)
      })
    }

    if (step === 'OFFERING' && saidYes()) {
      stopListening()
      setselectedSlot(slots[offeredSlotIndex])
      setStep('SLOT_SELECTED')
    }
  }, [step, userAnswer])

  const confirmSelectedSlot = async () => {
    await say(`Thank you. You have choosen the: ${getReadableDateTime(selectedSlot?.start)}`)
    await say('To confirm, please, say yes')
    startListening()
  }

  useEffect(() => {
    if (selectedSlot && !confirmed) {
      confirmSelectedSlot()
    }
  }, [selectedSlot])



  useEffect(() => {
    if (step === 'WELCOME') {
      setIsCalling(true)
      say(`
        Hello. You are calling the hair dresser shop of Gideon.
        I am a virtual assistant and I will help you to book a slot for you.
        I will offer you the available slots.
        To choose one, please, say yes.
      `).then(() => setStep('OFFERING'))
    }
    if (step === 'OFFERING') {
      setOfferedSlotIndex(0)
    }
  }, [step])

  return (
    <section>
      <p>Book a slot with the help of our virtual assistant</p>
      <button
        onClick={() => setStep('WELCOME')}
        disabled={isCalling}
        >
        Start
      </button>
      <p style={{ color: 'gray' }}>Status: {steps[step]}</p>
      {!selectedSlot && offeredSlotIndex !== null && slots[offeredSlotIndex] && <p>{getReadableDateTime(slots[offeredSlotIndex]?.start)}</p>}
      {selectedSlot && <p>{getReadableDateTime(selectedSlot?.start)}</p>}
      {isRecording && <p>Listening your answer...</p>}
      <br /><br />
      {confirmed && (
        <ICalendarLink event={{
          title: "Hair dresser",
          startTime: selectedSlot.start,
          location: "Budapest, Kis Rókus u. 16-20, 1024",
        }}>
          <button>
            Add to my calendar
          </button>
        </ICalendarLink>
      )}
    </section>
  )
}

export default Schedule
