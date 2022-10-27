import Link from "next/link";
import Dictaphone from "../components/Dictaphone";
import Speech from "../components/Speech";
import styles from '../styles/homepage.module.css'

const App = () => {
  return (
    <section>
      <nav className={styles.wrap}>
        <h3>Menü</h3>
        <ul>
          <li>
            <Link href="/voice-note">Hangjegyzet</Link>
          </li>
          <li>
            <Link href="/reader">Felolvasó</Link>
          </li>
          <li>
            <Link href="/schedule">Időpont foglaló</Link>
          </li>          
        </ul>
      </nav>
    </section>
  )
}

export default App;