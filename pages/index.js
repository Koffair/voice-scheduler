import Dictaphone from "../components/Dictaphone";
import Speech from "../components/Speech";
import styles from '../styles/homepage.module.css'

const App = () => {
  return (
    <div className={styles.wrap}>
      <Dictaphone />
      <hr />
      <Speech />
    </div>
  )
}

export default App;