import AppLayout from "../components/AppLayout";
import SubPageLayout from "../components/SubPageLayout";
// import dynamic from 'next/dynamic'
// const ListenAnswerNoSSR = dynamic(() => import('../components/ListenAnswer'), {
//   ssr: false
// })
import { useState } from "react"
import ListenAnswer, { defaultTrigger } from "../components/ListenAnswer";
import Say from "../components/Say";
import Color from "../components/Color";
import { intersect } from "../functions";

const App = () => {
  const [started, setStarted] = useState(false)

  const handleStartClick = () => {
    if (!started) {
      setStarted(true)
    } else {
      setStarted(() => false)
      setTimeout(() => {
        setStarted(() => true)
      }, 500)
    }
  }

  return (
    <AppLayout>
      <SubPageLayout>
        <button onClick={handleStartClick}>
          {started ? 'Start over' : 'Start'}
        </button>
        {started && (
          <Say text="Please choose a color. Red or blue." autoStart>
            <ListenAnswer
              expected={["blue", "red"]}
              autoStart
            >
              {({ responses }) => {
                if (responses.includes("blue")) return (
                  <>
                    <Color color="blue" />
                    <Say text="What type of blue? Dark blue or light blue" autoStart>
                      <ListenAnswer
                        expected={["dark blue", "light blue", "dark", "light"]}
                        autoStart
                      >
                        {({ responses }) => (
                          <>
                            {!!intersect(responses, ["dark blue", "dark"]).length && (
                              <Color color="darkblue" />
                            )}
                            {!!intersect(responses, ["light blue", "light"]).length && (
                              <Color color="lightblue" />
                            )}
                          </>
                        )}
                      </ListenAnswer>
                    </Say>
                  </>
                )
                if (responses.includes("red")) return <Color color="red" />
              }}
            </ListenAnswer>
          </Say>
        )}
      </SubPageLayout>
    </AppLayout>
  )
}

export default App;