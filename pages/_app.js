import '../styles/globals.css'
import { AuthUserProvider } from '../firebase/authContext';

function MyApp({ Component, pageProps }) {
  return (<AuthUserProvider><Component {...pageProps} /></AuthUserProvider>)
}

export default MyApp
