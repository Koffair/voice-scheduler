import AppLayout from "../components/AppLayout";
import SubPageLayout from "../components/SubPageLayout";
import { Subscribe } from "@react-rxjs/core";
// import dynamic from 'next/dynamic'
// const ListenAnswerNoSSR = dynamic(() => import('../components/ListenAnswer'), {
//   ssr: false
// })
import ListenAnswer, { defaultTrigger } from "../components/ListenAnswer";

import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import Color from "../components/Color";

const [textChange$, setText] = createSignal()

const [useText, text$] = bind(textChange$, "")

const [useCharCount, charCount$] = bind(text$);

const App = () => {

  return (
    <AppLayout>
      <SubPageLayout>
        <Subscribe>
          <ListenAnswer
            useText={useText}
            setText={setText}
            expected={["blue", "red"]}
            trigger={defaultTrigger}
          >
            <>
              <div>blue</div>
              <ListenAnswer
                useText={useText}
                setText={setText}
                expected={["dark blue", "azure"]}
                autoStart
              >
                <div>dark blue</div>
                <div>azure</div>
              </ListenAnswer>
            </>
            <div>red</div>
          </ListenAnswer>
          <Color useText={useText} />
        </Subscribe>
      </SubPageLayout>
    </AppLayout>
  )
}

export default App;