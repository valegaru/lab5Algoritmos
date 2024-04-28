import { ApiTypeProduct } from './products';
import { ApiTypeFavorites } from './favorites';

export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	products: ApiTypeProduct[];
	favorites: ApiTypeFavorites[];
};

export enum ProductsActions {
	'GET' = 'GET',
}

export interface GetProductsAction {
	action: ProductsActions.GET;
	payload: ApiTypeProduct[];
}

export enum FavoritesActions {
	'GET2' = 'GET2',
}

export interface GetFavoritesAction {
	action: FavoritesActions.GET2;
	payload: ApiTypeFavorites;
}

export type Actions = GetFavoritesAction | GetProductsAction;
