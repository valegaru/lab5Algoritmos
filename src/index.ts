import './components/export';
import './screens/dashboard';
import { AppState } from './types/store';
import { appState } from './store/index';
import { addObserver } from './store/index';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = '';
		switch (appState.screen) {
			case 'SHOPPINGCART':
				const shoppingcart = this.ownerDocument.createElement('app-cart');
				this.shadowRoot?.appendChild(shoppingcart);
				break;

			case 'DASHBOARD':
				const dashboard = this.ownerDocument.createElement('app-dashboard');
				this.shadowRoot?.appendChild(dashboard);
				break;

			default:
				break;
		}
	}
}
customElements.define('app-container', AppContainer);
