import TransitionEffect from '../components/TransitionEffect';
import '../styles/globals.css'
// import "../styles/styles.css";
import "../styles/transition.css";

import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <TransitionEffect>
          <Component {...pageProps} />
        </TransitionEffect>
      </div>
    </ThemeProvider>
  );
}


export default MyApp;
