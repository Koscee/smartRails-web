import '../styles/variables.less';
import '../styles/theme.variables.css';
import '../styles/globals.css';
import { AuthProvider, TicketPurchaseProvider } from '../contexts';

// const token = typeof window !== 'undefined' ? localStorage.jwtToken : null;

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <TicketPurchaseProvider>
        {getLayout(<Component {...pageProps} />)}
      </TicketPurchaseProvider>
    </AuthProvider>
  );
}

export default MyApp;
