import { Provider } from 'react-redux';
import { useStore } from '@services/store';

import '@styles/globals.css';

const App = ({ Component, pageProps }) => {
	const store = useStore(pageProps.initialReduxState);
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

export default App;
