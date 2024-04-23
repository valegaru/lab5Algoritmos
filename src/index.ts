import './components/export';
import './screens/dashboard';
import { AppState } from './types/store';
import { addObserver, appState } from './store/index';

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
		switch (appState.screen) {
			case 'dashboard':
				const dashboard = this.ownerDocument.createElement('app-dashboard');
				this.shadowRoot?.appendChild(dashboard);
				break;

			default:
				break;
		}
		const something = this.ownerDocument.createElement('div');
		this.shadowRoot?.appendChild(something);
	}
}

customElements.define('app-container', AppContainer);
