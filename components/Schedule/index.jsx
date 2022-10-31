import React, { useState, useEffect, useRef } from 'react'
import ICalendarLink from "react-icalendar-link";
import useFlow from '../../hooks/useFlow'
import useSpeech from "../../hooks/useSpeech"
import useSpeechRecognition from '../../hooks/useSpeechRecognition'

const slots = [
  { timeString: "2022-11-02T09:00:00+01:00", title: "E hét szerda 9 óra" },
  { timeString: "2022-11-04T15:00:00+01:00", title: "E hét péntek 3 óra" },
  { timeString: "2022-11-08T12:00:00+01:00", title: "Jövő kedd 12 óra" },
]

const Schedule = () => {
  const { say, stopSpeaking } = useSpeech()
  const { wait } = useFlow()
  const userAnswer = useRef('')

  const handleGotAnswer = (answer) => {
    userAnswer.current = answer
  }

  const waitForAnswer = async (time = 3) => {
    setisRecording(true)
    await wait(time)
    setisRecording(false)
    const answer = userAnswer.current
    userAnswer.current = ''
    console.log(answer)
    return answer
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


  useEffect(() => {
    if (selectedSlot){
      confirmSelectedSlot()
    }
  }, [selectedSlot])


  const sayOffers = async () => {
    let offerAccepted
    for (const slot of slots) {
      await say(slot.title)
      if ((await waitForAnswer()).toLowerCase() === 'igen') {
        offerAccepted = true
        setselectedSlot(slot)
        break
      }

    }
   if (!offerAccepted) {
    await say('Ön nem választott időpontot. Viszontlátásra.')
    setIsCalling(false)
   }
  }

  const confirmSelectedSlot = async () => {
    await say(`Köszönöm. Ön a következő időpontot választotta: ${selectedSlot?.title}`)
    await say('A megerősítéshez mondjon igent')
    if ((await waitForAnswer()).toLowerCase() === 'igen') {
      setConfirmed(true)
      await say(`
        Köszönöm.
        A foglalás megerősítve.
        Várjuk Önt a következő időpontban: ${selectedSlot?.title}.
        A viszontlátásra.
      `)
      setIsCalling(false)
    } else {
      await say('Ön nem erősítette meg a foglalást. A foglalás sikertelen. Viszontlátásra.')
      setIsCalling(false)
    }
  }


  const hancdleStartClick = async () => {
    setIsCalling(true)
    await say(`
      Üdvözlöm, Gedeon bácsi fodrászüzletét hívta.
      Én egy virtuális asszisztens vagyok, nálam tud időpontot foglalni, hogy ne zavarjuk a mestert munka közben.
      Felsorolom önnek a szabad időpontokat, amelyekből választhat.
      Amennyiben megfelel az időpont, mondja azt, hogy igen.
    `)
    await sayOffers()
  }

  return (
    <section>
      <p>Foglaljon időpontot virtuális asszisztensünknél</p>
      <button
        onClick={hancdleStartClick}
        disabled={isCalling}
        >
        Mehet
      </button>
      <br /><br />
      {confirmed && (
        <ICalendarLink event={{
          title: "Fodrász",
          startTime: selectedSlot.timeString,
          location: "Lövőház utca 2-6, Budapest",
        }}>
          <button>
            Hozzáadás a naptáramhoz
          </button>
        </ICalendarLink>
      )}
    </section>
  )
}

export default Schedule
