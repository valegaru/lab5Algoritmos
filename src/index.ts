import './components/export';
import './screens/dashboard';
import './screens/ShoppingCart';
import { AppState } from './types/store';
import { appState } from './store/index';
import { addObserver } from './store/index';
import styles from './index.css';

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
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `<section id="shoppingcart">
            <app-cart></app-cart>  </section>

`;
			//renderiza el dashboard
			const dashboard = this.ownerDocument.createElement('app-dashboard');
			this.shadowRoot?.appendChild(dashboard);
			//css
			const cssContainer = this.ownerDocument.createElement('style');
			cssContainer.innerHTML = styles;
			this.shadowRoot?.appendChild(cssContainer);
		}
	}
}
customElements.define('app-container', AppContainer);
