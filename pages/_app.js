import TransitionEffect from '../components/TransitionEffect';
import '../styles/globals.css'
// import "../styles/styles.css";
import "../styles/transition.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app-container">
      <TransitionEffect>
        <Component {...pageProps} />
      </TransitionEffect>
    </div>
  );
}

export default MyApp;
