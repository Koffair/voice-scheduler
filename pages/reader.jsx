import AppLayout from "../components/AppLayout";
import Speech from "../components/Speech";
import SubPageLayout from "../components/SubPageLayout";

const ReaderPage = () => {
  return (
    <AppLayout>
      <SubPageLayout>
        <Speech />
      </SubPageLayout>
    </AppLayout>
  )
}

export default ReaderPage;