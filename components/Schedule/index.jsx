import React, { useState, useEffect, useRef, useCallback } from 'react'
import ICalendarLink from "react-icalendar-link";
import useFlow from '../../hooks/useFlow'
import useSpeech from "../../hooks/useSpeech"
import useSpeechRecognition from '../../hooks/useSpeechRecognition'

const getReadableDateTime = (timeString, locale = 'en-US') => {
  const date = new Date(timeString)
  const day = date.toGMTString().split(' ').slice(0, 3).join(' ') // TODO: GTM only works in en-US. Need further enhancement with localetimestrind
  const time = date.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric' })
  return `${day}, ${time}`
}

const slots = [
  { timeString: "2022-11-09T09:00:00+01:00", title: getReadableDateTime("2022-11-09T09:00:00+01:00") },
  { timeString: "2022-11-11T15:00:00+01:00", title: getReadableDateTime("2022-11-11T15:00:00+01:00") },
  { timeString: "2022-11-12T12:00:00+01:00", title: getReadableDateTime("2022-11-12T12:00:00+01:00") },
]

const Schedule = () => {
  const { say, stopSpeaking } = useSpeech()
  const { wait } = useFlow()
  const userAnswer = useRef('')

  const handleGotAnswer = (answer) => {
    userAnswer.current = answer
  }

  const {
    setisRecording
  } = useSpeechRecognition({
    onResult: handleGotAnswer,
    options: {
      continuous: false,
      interimResults: false,
    }
  })

  const [isCalling, setIsCalling] = useState(false)
  const [selectedSlot, setselectedSlot] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const waitForAnswer = useCallback(async (time = 3) => {
    setisRecording(true)
    await wait(time)
    setisRecording(false)
    const answer = userAnswer.current
    userAnswer.current = ''
    return answer
  }, [setisRecording, wait])  

  const confirmSelectedSlot = useCallback(async () => {
    await say(`Thank you. You have choosen the: ${selectedSlot?.title}`)
    await say('To confirm, please, say yes')
    if ((await waitForAnswer()).toLowerCase() === 'yes') {
      setConfirmed(true)
      await say(`
        Thank you.
        Your appointment has been confirmed.
        See you on: ${selectedSlot?.title}.
        Good bye.
      `)
      setIsCalling(false)
    } else {
      await say('You did not confirm.')
      setIsCalling(false)
    }
  }, [say, waitForAnswer, setConfirmed, setIsCalling, selectedSlot])

  useEffect(() => {
    if (selectedSlot){
      confirmSelectedSlot()
    }
  }, [selectedSlot, confirmSelectedSlot])


  const sayOffers = async () => {
    let offerAccepted
    for (const slot of slots) {
      await say(slot.title)
      if ((await waitForAnswer()).toLowerCase() === 'yes') {
        offerAccepted = true
        setselectedSlot(slot)
        break
      }

    }
   if (!offerAccepted) {
    await say('You have not choosen any slot. Good bye.')
    setIsCalling(false)
   }
  }


  const hancdleStartClick = async () => {
    setIsCalling(true)
    await say(`
      Hello. You are calling the hair dresser shop of Gideon.
      I am a virtual assistant and I will help you to book a slot for you.
      I will offer you the available slots.
      To choose one, please, say yes.
    `)
    await sayOffers()
  }

  return (
    <section>
      <p>Book a slot with the help of our virtual assistant</p>
      <button
        onClick={hancdleStartClick}
        disabled={isCalling}
        >
        Start
      </button>
      <br /><br />
      {confirmed && (
        <ICalendarLink event={{
          title: "Hair dresser",
          startTime: selectedSlot.timeString,
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
