import Storage, { PersistanceKeys } from '../utils/storage';
import { Actions, AppState, Observer } from '../types/store';
import { reducer } from './reducer';

export let appState = {
	screen: 'SHOPPINGCART',
	background: 'red',
};

//De aquí hacia abajo no se lo aprendan de memoria, siempre va a estar ahí el archivo, esto es configuración
let observers: any = [];

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	appState = reducer(action, clone);
	observers.forEach((o: any) => o.render());
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
