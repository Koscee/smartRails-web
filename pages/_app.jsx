import '../styles/variables.less';
import '../styles/theme.variables.css';
import '../styles/globals.css';
import { TicketPurchaseProvider } from '../contexts';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <TicketPurchaseProvider>
      {getLayout(<Component {...pageProps} />)}
    </TicketPurchaseProvider>
  );
}

export default MyApp;
