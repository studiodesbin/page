import '../styles/globals.css';
import '../styles/navigation.css';
import Navigation from '../components/Navigation';
export default function App({ Component, pageProps }) {
  return <><Navigation /><Component {...pageProps} /></>;
}
