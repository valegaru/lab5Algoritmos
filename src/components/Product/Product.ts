import styles from './Product.css';
import { AttributeItem } from '../ShoppingCartItems/ShoppingCartItems';
import '../ShoppingCartItems/ShoppingCartItems';

export enum AttributeProduct {
	'uid' = 'uid',
	'image' = 'image',
	'utitle' = 'utitle',
	'description' = 'description',
	'category' = 'category',
	'price' = 'price',
	'rating' = 'rating',
}

export default class Product extends HTMLElement {
	uid?: string;
	image?: string;
	utitle?: string;
	description?: string;
	category?: string;
	price?: string;
	rating?: string;

	static get observedAttributes() {
		const attrs: Record<AttributeProduct, null> = {
			uid: null,
			image: null,
			utitle: null,
			description: null,
			category: null,
			price: null,
			rating: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeProduct, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case AttributeProduct.uid:
			default:
				this[propName] = newValue;
				break;
		}
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `<section>
  <img
   src='${this.image}'></img>
  <h1>${this.utitle}</h1>
	<h2>price: $ ${this.price}</h2>
	<h3>rating: ${this.rating}</h3>
	<h3>category: ${this.category}</h3>
	<p>${this.description}</p>
	<button class='shopping'>Add to Shopping Cart</button>
  </section>
`;
//listener en el boton, el click desencadena la funcionaddToShoppingCart
			const shoppingButton = this.shadowRoot.querySelector('.shopping');
			if (shoppingButton) {
				shoppingButton.addEventListener('click', () => {
					this.addToShoppingCart();
				});
			}
		}
		const cssProduct = this.ownerDocument.createElement('style');
		cssProduct.innerHTML = styles;
		this.shadowRoot?.appendChild(cssProduct);
	}

	addToShoppingCart() {
		// Al hundir el boton, crear un nuevo ítem con los datos del producto actual
		const newItem = document.createElement('my-item') as HTMLElement;
		newItem.setAttribute(AttributeItem.image, this.image || '');
		newItem.setAttribute(AttributeItem.utitle, this.utitle || '');
		newItem.setAttribute(AttributeItem.price, this.price || '');

		// Agregar el nuevo ítem a la lista de ShoppingCart
		const shoppingCart = document.querySelector('.shopping-cart');
		if (shoppingCart) {
			shoppingCart.appendChild(newItem);
		}

		// Como lo paso al appState antes de  al local storage??
		const currentShoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
		currentShoppingCart.push({
			image: this.image,
			utitle: this.utitle,
			price: this.price,
		});
		localStorage.setItem('shoppingCart', JSON.stringify(currentShoppingCart));
	}
}

customElements.define('my-product', Product);
