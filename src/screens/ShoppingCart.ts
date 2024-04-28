import { getProducts } from '../services/getProducts';
import { AttributeItem } from '../components/ShoppingCartItems/ShoppingCartItems';
import '../components/export';
import { ApiTypeProduct } from '../types/products';
import styles from './styles.css';
import { addObserver, appState } from '../store/index';

class ShoppingCart extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `  <h1>Shopping Cart</h1>`;

		appState.favorites.forEach((item: any) => {
			const newItem = this.ownerDocument.createElement('my-item');
			newItem.setAttribute(AttributeItem.utitle, item.utitle);
			newItem.setAttribute(AttributeItem.image, item.image);
			newItem.setAttribute(AttributeItem.price, item.price);
			this.shadowRoot?.appendChild(newItem);
		});

		const cssCart = this.ownerDocument.createElement('style');
		cssCart.innerHTML = styles;
		this.shadowRoot?.appendChild(cssCart);
	}
}

customElements.define('app-cart', ShoppingCart);
