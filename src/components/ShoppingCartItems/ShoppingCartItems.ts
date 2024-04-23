export enum AttributeItem {
	'image' = 'image',
	'utitle' = 'utitle',
	'price' = 'price',
}

export default class Item extends HTMLElement {
	image?: string;
	utitle?: string;
	price?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeItem, null> = {
			image: null,
			utitle: null,
			price: null,
		};
		return Object.keys(attrs);
	}
	attributeChangedCallback(propName: AttributeItem, oldValue: string, newValue: string) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
    <img src='${this.image}'></img>
    <h2>${this.utitle}</h2>
    <p> <b>${this.price}</b></p>
    `;
		}
	}
}

customElements.define('my-item', Item);
