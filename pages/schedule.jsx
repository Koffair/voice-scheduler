import AppLayout from "../components/AppLayout"
import Schedule from "../components/Schedule"
import SubPageLayout from "../components/SubPageLayout"

const SchedulePage = () => {
  return (
    <AppLayout>
      <SubPageLayout>
        <Schedule />
      </SubPageLayout>
    </AppLayout>
  )
}

export default SchedulePage
