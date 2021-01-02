import { useMemo } from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

let store;

const composeEnhancer =
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		  // @ts-ignore
		  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

function initStore(initialState) {
	return createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunkMiddleware)));
}

export const initializeStore = preloadedState => {
	let _store = store ?? initStore(preloadedState);

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		_store = initStore({
			...store.getState(),
			...preloadedState,
		});
		// Reset the current store
		store = undefined;
	}

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;

	return _store;
};

export const useStore = initialState => {
	return useMemo(() => initializeStore(initialState), [initialState]);
};
