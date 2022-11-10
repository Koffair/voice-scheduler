import AppLayout from "../components/AppLayout";
import SubPageLayout from "../components/SubPageLayout";
import dynamic from 'next/dynamic'

const DictaphoneNoSSR = dynamic(() => import('../components/Dictaphone'), {
  ssr: false
})

const App = () => {
  return (
    <AppLayout>
      <SubPageLayout>
        <DictaphoneNoSSR />
      </SubPageLayout>
    </AppLayout>
  )
}

export default App;