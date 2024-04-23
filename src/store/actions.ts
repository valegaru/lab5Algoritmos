import { getProducts } from "../services/getProducts";
import { Observer, AppState, SomeActions, XAction, Actions } from "../types/store";

export const GetProducts = async(): Promise<getProducts> => {
const dataProducts= await getProducts();
  return {
		action: GetProducts,
		payload: payload,
	};
};

export const GetProductsFavorite = (payload: any) => {
	return {
		action: 'GetProductsFavorite',
		payload: payload,
	};
};

export const SetProductsFromFavorite = (payload: any) => {
	return {
		action: 'SetProductsFromFavorite',
		payload: payload,
	};
};