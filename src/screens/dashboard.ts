import { AttributeProduct } from '../components/Product/Product';
import '../components/export';
import { ApiTypeProduct } from '../types/products';
import styles from './styles.css';
import { GetProducts } from '../store/actions';
import { addObserver, appState, dispatch } from '../store/index';
import { Item } from '../components/export';
import { AttributeItem } from '../components/ShoppingCartItems/ShoppingCartItems';

export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		//lo renderiza sin pasar por el appState
		const action = await GetProducts();
		dispatch(action);
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = ``;

		appState.products.forEach((product) => {
			const card = this.ownerDocument.createElement('my-product');
			card.setAttribute(AttributeProduct.image, product.image);
			card.setAttribute(AttributeProduct.utitle, product.title);
			card.setAttribute(AttributeProduct.category, product.category);
			card.setAttribute(AttributeProduct.description, product.description);
			card.setAttribute(AttributeProduct.price, product.price);
			card.setAttribute(AttributeProduct.rating, product.rating.rate);
			this.shadowRoot?.appendChild(card);
		});

		const title = this.ownerDocument.createElement(`h1`);
		title.innerText = `Favoritos`;
		this.shadowRoot?.appendChild(title);

		if (appState.favorites) {
			appState.favorites.forEach((item: any) => {
				const newItem = this.ownerDocument.createElement('my-item') as Item;
				newItem.setAttribute(AttributeItem.utitle, item.utitle);
				newItem.setAttribute(AttributeItem.image, item.image);
				newItem.setAttribute(AttributeItem.price, item.price);
				this.shadowRoot?.appendChild(newItem);
			});
		}
	}
}

customElements.define('app-dashboard', Dashboard);
