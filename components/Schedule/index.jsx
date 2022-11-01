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

const getReadableDateTime = (timeString, locale = 'en-US') => {
  const date = new Date(timeString)
  const day = date.toGMTString().split(' ').slice(0, 3).join(' ') // TODO: GTM only works in en-US. Need further enhancement with localetimestrind
  const time = date.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric' })
  return `${day}, ${time}`
}

const Schedule = () => {
  const { say, stopSpeaking } = useSpeech()
  const { wait } = useFlow()

  const [isCalling, setIsCalling] = useState(false)
  const [userAnswer, setUserAsnwer] = useState('')
  const [offeredSlotIndex, setOfferedSlotIndex] = useState(null)
  const [selectedSlot, setselectedSlot] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const {
    setisRecording,
    isRecording
  } = useSpeechRecognition({
    onResult: setUserAsnwer,
    options: {
      continuous: true,
      interimResults: true,
    }
  })

  const startListening = () => {
    setUserAsnwer(null)
    setisRecording(true)
  }

  const stopListening = () => {
    setisRecording(false)
  }

  useEffect(() => {
    if (offeredSlotIndex !== null && !selectedSlot) {
      if (!slots[offeredSlotIndex]) {
        say('You have not choosen any slot. Good bye.').then(() => {
          stopListening()
          setIsCalling(false)
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



  useEffect(() => {
    if (['yes', 'yeah'].includes(userAnswer?.toLowerCase())) {
      stopListening()
      if (selectedSlot) {
        setConfirmed(true)
        say(`Your appointment has been confirmed. See you on ${getReadableDateTime(selectedSlot?.start)}. Good bye.`)
        .then(setIsCalling(false))
      } else {
        setselectedSlot(slots[offeredSlotIndex])
      }
    }
  }, [userAnswer])

  const confirmSelectedSlot = async () => {
    await say(`Thank you. You have choosen the: ${getReadableDateTime(selectedSlot?.start)}`)
    await say('To confirm, please, say yes')
    startListening()
    await wait(8)
    stopListening()

    // if (!confirmed) {
    //   say('You have not confirmed your appointment. The booking has been failed. Good bye.')
    //   .then(() => {
    //     setIsCalling(false)
    //   })
    // }
  }

  useEffect(() => {
    if (selectedSlot){
      confirmSelectedSlot()
    }
  }, [selectedSlot])



  const hancdleStartClick = async () => {
    setIsCalling(true)
    await say(`
      Hello. You are calling the hair dresser shop of Gideon.
      I am a virtual assistant and I will help you to book a slot for you.
      I will offer you the available slots.
      To choose one, please, say yes.
    `)
    setOfferedSlotIndex(0)
  }

  return (
    <section>
      <p>Book a slot with the help of our virtual assistant</p>
      <button
        onClick={hancdleStartClick}
        disabled={isCalling}
        >
        Let's get started
      </button>
      {!selectedSlot && offeredSlotIndex !== null && <p>Offering: {getReadableDateTime(slots[offeredSlotIndex]?.start)}</p>}
      {selectedSlot && <p>Selected: {selectedSlot?.start}</p>}
      {isRecording && <p>Listening...</p>}
      <p>{userAnswer}</p>
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
