import axios from "axios";
import store from "../store/reducers/store";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_END_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401 && 
            !error.config?.url?.includes("/auth/login")
        ) {

            store.dispatch({ type: "LOG_OUT" });
            store.dispatch({ type: "CLEAR_CART" });
            store.dispatch({ type: "REMOVE_CHECKOUT_ADDRESS" });
            store.dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });

            localStorage.removeItem("auth");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("CHECKOUT_ADDRESS");

            // window.location.href = "/login";
            toast.error("Session expired. Please login again.");
        }

        return Promise.reject(error);
    }
);

export default api;


