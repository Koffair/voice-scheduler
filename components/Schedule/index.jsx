import React, { useState, useEffect, useRef } from 'react'
import useFlow from '../../hooks/useFlow'
import useSpeech from "../../hooks/useSpeech"
import useSpeechRecognition from '../../hooks/useSpeechRecognition'

const slots = [
  { timeString: "2012-11-02T09:00:00+02:00", title: "E hét szerda 9 óra" },
  { timeString: "2012-11-04T15:00:00+02:00", title: "E hét péntek 3 óra" },
  { timeString: "2012-11-08T12:00:00+02:00", title: "Jövő kedd 12 óra" },
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

  const [selectedSlot, setselectedSlot] = useState(null)


  useEffect(() => {
    confirmSelectedSlot()
  }, [selectedSlot])


  const sayOffers = async () => {
    let offerAccepted
    for (const slot of slots) {
      await say(slot.title)
      await say('Foglaláshoz mondjon igent')
      if (await waitForAnswer() === 'igen') {
        offerAccepted = true
        setselectedSlot(slot)
        break
      }
    }
    if (!offerAccepted) {
      await say('Ön nem választott időpontot.')
    }
  }

  const confirmSelectedSlot = async () => {
    await say(`Köszönöm. Ön a következő időpontot választotta: ${selectedSlot?.title}`)
    await say('A megerősítéshez mondjon igent')
    if (await waitForAnswer() === 'igen') {
      await say(`
        Köszönöm.
        A foglalás megerősítve.
        Várjuk Önt a következő időpontban: ${selectedSlot?.title}.
        A viszontlátásra.
      `)
    } else {
      await say('Ön nem erősítette meg a foglalást')
    }
  }


  const hancdleStartClick = async () => {
    // await say("A szabad időpontok:")
    await say(`
      Üdvözlöm, Gedeon bácsi fodrászüzletét hívta.
      Én egy virtuális asszisztens vagyok, nálam tud időpontot foglalni, hogy ne zavarjuk a mestert munka közben.
      Felsorolom önnek a szabad időpontokat, amelyekből választhat.
      Kérjük, a kiválasztáshoz mondjon igent az időpont elhangzása után.
    `)
    await sayOffers()
  }

  return (
    <section>
      <p>Foglaljon időpontot virtuális asszisztensünknél</p>
      <button
        onClick={hancdleStartClick}
        >
        Mehet
      </button>
      <button
        onClick={stopSpeaking}
        >
        Megszakít  
      </button>
    </section>
  )
}

export default Schedule
