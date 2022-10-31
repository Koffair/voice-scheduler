import Dictaphone from "../components/Dictaphone";
import AppLayout from "../components/AppLayout";
import SubPageLayout from "../components/SubPageLayout";

const App = () => {
  return (
    <AppLayout>
      <SubPageLayout>
        <Dictaphone />
      </SubPageLayout>
    </AppLayout>
  )
}

export default App;