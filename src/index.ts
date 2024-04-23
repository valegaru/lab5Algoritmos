import './components/export';
import './screens/dashboard';
import './screens/ShoppingCart';
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
		const dashboard = this.ownerDocument.createElement('app-dashboard');
		this.shadowRoot?.appendChild(dashboard);
	}
}
customElements.define('app-container', AppContainer);
