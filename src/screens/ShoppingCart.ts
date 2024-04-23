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
		
	}

	async connectedCallback() {
		const data = await getProducts();
		console.log(data);
		this.render(data);
	}

	render(data: any) {
		if (this.shadowRoot) this.shadowRoot.innerHTML = ``;

		data.forEach((product: ApiTypeProduct) => {
			const item = this.ownerDocument.createElement('my-item');
			item.setAttribute(AttributeItem.utitle, product.title);
			item.setAttribute(AttributeItem.image, product.image);
			item.setAttribute(AttributeItem.price, product.price);
			this.shadowRoot?.appendChild(item);
		});

		const cssCart = this.ownerDocument.createElement('styles');
		cssCart.innerHTML = styles;
		this.shadowRoot?.appendChild(cssCart);
	}
}

customElements.define('app-cart', ShoppingCart);
