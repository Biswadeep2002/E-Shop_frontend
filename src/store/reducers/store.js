import {configureStore} from "@reduxjs/toolkit";
import ProductReducer from "./ProductReducer";
import errorReducer from "./ErrorReducer";
import { cartReducer } from "./CartReducer";
import { authReducer } from "./AuthReducer";
import { adminReducer } from "./adminReducer";
import paymentMethodReducer from "./paymentMethodReducer";
import { sellerReducer } from "./sellerReducer";
import { orderReducer } from "./orderReducer";

const user = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth"))
                : null;

const storedCart = localStorage.getItem("cartItems");


const cartItems =
  storedCart && storedCart !== "undefined"
    ? JSON.parse(storedCart)
    : [];                

const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
                ? JSON.parse(localStorage.getItem("cartItems"))
                : [];


const initialState = {
    auth: {user: user, selectedUserCheckoutAddress},
    carts: {cart: cartItems},
};


const store = configureStore({
    reducer: {
        products: ProductReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        admin: adminReducer,
        order: orderReducer,
        payment: paymentMethodReducer,
        seller: sellerReducer,
    },
    preloadedState: initialState,
})

export default store;