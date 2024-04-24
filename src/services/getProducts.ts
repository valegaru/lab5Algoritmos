export async function getProducts() {
	try {
		const data = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
		console.log(data);
		localStorage.setItem('products', JSON.stringify(data)); //lleva la data de products al localStorage
		return data;
	} catch (error) {
		console.error(error);
	}
}
