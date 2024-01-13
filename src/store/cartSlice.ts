import { CarModel } from './../models/response/CarModel';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CartItem {
    product: CarModel;
    quantity:number;
}

interface CartState {
    cartItems: CartItem[]
}


export const cartSlice = createSlice({
    name:'cart',
    initialState: {
		cartItems: JSON.parse(localStorage.getItem("cart") || "[]") || [],
	},
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<CarModel>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product === action.payload);
            if (itemIndex > -1) {
                // If the item already exists in the cart, increment the quantity
                state.cartItems[itemIndex].quantity += 1;
            } else {
                // If the item is not in the cart, add it with a quantity of 1
                state.cartItems.push({ product: action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        removeFromCart : (state: CartState, action: PayloadAction<CarModel>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product === action.payload);
            if (itemIndex > -1) {
                if (state.cartItems[itemIndex].quantity > 1) {
                    // If there's more than one of this item in the cart, decrement the quantity
                    state.cartItems[itemIndex].quantity -= 1;
                } else {
                    // If there's only one of this item in the cart, remove it
                    state.cartItems.splice(itemIndex, 1);
                }
                localStorage.setItem("cart", JSON.stringify(state.cartItems));
            }
        },
        clearCart: (state: CartState) =>  {
            state.cartItems = [];
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
            return state;
        }
    },
});


export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;