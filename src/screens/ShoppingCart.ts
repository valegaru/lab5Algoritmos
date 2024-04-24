import { getProducts } from '../services/getProducts';
import { AttributeItem } from '../components/ShoppingCartItems/ShoppingCartItems';
import '../components/export';
import { ApiTypeProduct } from '../types/products';
import styles from './styles.css';
import { addObserver } from '../store/index';

class ShoppingCart extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		//obtiene la lista shoppingCart con los items guardados
		const storedCart = localStorage.getItem('shoppingCart');
		if (storedCart) {
			const data = JSON.parse(storedCart);
			this.render(data);
		}
	}

	render(data: any[]) {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `  <h1>Shopping Cart</h1>`;

		data.forEach((item: any) => {
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
