import { getProducts } from '../services/getProducts';
import { AttributeProduct } from '../components/Product/Product';
import '../components/export';
import { ApiTypeProduct } from '../types/products';
import styles from './styles.css';

export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		//lo renderiza sin pasar por el appState
		const data = await getProducts();
		console.log(data);
		this.render(data);
	}

	render(data: any) {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `<section id="shoppingcart">
      <app-cart></app-cart>  </section>`;
		}

		data.forEach((product: ApiTypeProduct) => {
			const card = this.ownerDocument.createElement('my-product');
			card.setAttribute(AttributeProduct.image, product.image);
			card.setAttribute(AttributeProduct.utitle, product.title);
			card.setAttribute(AttributeProduct.category, product.category);
			card.setAttribute(AttributeProduct.description, product.description);
			card.setAttribute(AttributeProduct.price, product.price);
			card.setAttribute(AttributeProduct.rating, product.rating.rate);
			this.shadowRoot?.appendChild(card);
		});
		const cssDashboard = this.ownerDocument.createElement('style');
		cssDashboard.innerHTML = styles;
		this.shadowRoot?.appendChild(cssDashboard);
	}
}

customElements.define('app-dashboard', Dashboard);
