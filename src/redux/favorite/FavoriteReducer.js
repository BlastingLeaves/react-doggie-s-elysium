import {ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE} from "./FavoriteConstants";

const initialState = {
    products: []
}

export function favoriteReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_FAVORITE:
            let productInFavorite = false;
            const updatedProducts = state.products.map(product => {
                if (product.id === action.payload.product.id) {
                    productInFavorite = true;
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                } else {
                    return product;
                }
            })

            if (!productInFavorite) {
                return Object.assign({}, state, {
                    products: [
                        ...state.products,
                        {
                            ...action.payload.product,
                            quantity: 1
                        }
                    ]
                })
            } else {
                return Object.assign({}, state, {
                    products: updatedProducts
                });
            }
        case REMOVE_FROM_FAVORITE:
            const filteredProducts = state.products.filter(product => {
                return product.id !== action.payload.id
            });

            return Object.assign({}, state, {
                products: filteredProducts
            });
        default:
            return state;
    }
}

