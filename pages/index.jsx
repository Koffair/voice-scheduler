import Link from "next/link";
import AppLayout from "../components/AppLayout";
import styles from '../styles/homepage.module.css'

const App = () => {
  return (
    <AppLayout>
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
    </AppLayout>
  )
}

export default App;