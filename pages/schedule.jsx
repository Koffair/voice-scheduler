import useSpeech from "../hooks/useSpeech"


const SchedulePage = () => {
  const { startSpeaking, handleStop} = useSpeech()

  const hancdleStartClick = () => {
    startSpeaking("Üdvözlöm, Gedeon bácsi fodrászüzletét hívta. Én egy virtuális asszisztens vagyok, nálam tud időpontot foglalni, hogy ne zavarjuk a mestert munka közben. Felsorolom önnek a szabad időpontokat, amelyekből választhat.")
  }

  return (
    <section>
      <p>Foglaljon időpontot virtuális asszisztensünknél</p>
      <button
        onClick={hancdleStartClick}
        >
        Mehet
      </button>
    </section>
  )
}

export default SchedulePage