import api from "../../api/api";
import toast from "react-hot-toast";

let latestUserOrdersRequestId = 0;

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({
            type: "IS_LOADING",
        })

        const endpoint = queryString ? `/auth/product/get?${queryString}` : "/auth/product/get";
        const { data, status } = await api.get(endpoint, {
            validateStatus: () => true,
        });

        console.log("API Response:", data.content);

        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        })
        dispatch({
            type: "IS_SUCCESS",
        })
    } catch (error) {
        console.log("The error is ", error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.message,
        })

        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
    }
};



export const fetchCategories = (queryString) => async (dispatch) => {
    try {
        dispatch({
            type: "CATEGORY_LOADING",
        })

        const endpoint = queryString ? `/auth/category/get?${queryString}` : "/auth/category/get";
        const { data, status } = await api.get(endpoint, {
            validateStatus: () => true,
        });

        console.log("Categories are ", data.content);

        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        })
        dispatch({
            type: "CATEGORY_SUCCESS",
        })
    } catch (error) {
        console.log("The error is ", error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.message,
        })
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
    }
};


export const addToCart = (data, qty = 1, toast) =>
    (dispatch, getState) => {
        const { products } = getState().products;
        const getProduct = products.find((item) => item.productId === data.productId);

        const isQuantityExist = getProduct.quantity >= qty;


        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });

            toast.success(`${data?.productName} added to the cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error(`Out of stock`);
        }
    };



export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {

        console.log("Data are", data);
        const { products } = getState().products;
        console.log("products are ", products);


        const getProduct = products.find((item) => item.productId === data.productId);
        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                // payload: { ...data, quantity: newQuantity + 1 },
                payload: { ...data, quantity: newQuantity },
            });

            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

        } else {
            toast.error("Quantity limit reached")
        }
    };

export const decreaseCartQuantity = (data, newQuantity) => (dispatch, getState) => {
    dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({ type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} is removed from the cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSignedInUser =
    (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/login", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));

            console.log("Before getUserCart");
            await dispatch(getUserCart());
            console.log("After getUserCart");

            reset();
            toast.success("Login Successful");
            navigate("/");
        } catch (error) {
            console.log("Error is", error.message);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
    }

export const registerNewUser =
    (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/register", sendData);
            reset();
            toast.success(data?.message || "User Registration Successful");
            navigate("/login");
        } catch (error) {
            console.log("Error is", error.message);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
        } finally {
            setLoader(false);
        }
    };

// export const logOutUser = (navigate) => (dispatch) => {
//     dispatch({ type: "LOG_OUT" });
//     localStorage.removeItem("auth");
//     navigate("/login");
// }


// export const logOutUser = (navigate) => async (dispatch) => {
//     try {
//         await api.post("/auth/signout");
//     } finally {
//         dispatch({ type: "LOG_OUT" });
//         localStorage.removeItem("auth");
//         navigate("/login");
//     }
// };


// export const saveCartBeforeLogout =
//     (cartItems) => async () => {

//         await api.post(
//             "/auth/cart/create",
//             cartItems
//         );

//     };


export const logOutUser = (navigate) => async (dispatch, getState) => {
    try {

        const cart = getState().carts.cart;
        await api.post("/auth/cart/create", cart);

        // await dispatch(saveCartBeforeLogout(cart));

        await api.post("/auth/signout");


        // Clear Redux state
        dispatch({ type: "LOG_OUT" });
        dispatch({ type: "CLEAR_CART" });
        dispatch({ type: "REMOVE_CHECKOUT_ADDRESS" });
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "RESET_USER_ORDERS" });

        // Clear browser storage
        localStorage.removeItem("auth");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("CHECKOUT_ADDRESS");

        toast.success("Logged out successfully");
        navigate("/login");
    } catch (error) {
        console.error(error);
        toast.error("Unable to logout. Please try again.");
    }
};



export const addUpdateUserAddress =
    (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
        // const { user } = getState().auth;
        dispatch({ type: "BUTTON_LOADER" });
        try {
            if (!addressId) {
                const { data } = await api.post("/auth/addresses/create", sendData);
            }
            else {
                await api.put(`/auth/addresses/update/${addressId}`, sendData);
            }
            dispatch(getUserAddressess());
            toast.success("Address Saved Successfully");
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log("Error is", error.message);
            toast.error(error?.response?.data?.message || "Internal Server Error");
            dispatch({ type: "IS_ERROR", payload: null })
        } finally {
            setOpenAddressModal(false);
        }
    };


export const getUserAddressess = () => async (dispatch, getState) => {

    console.log("Fetching Address is happening");

    try {
        dispatch({
            type: "IS_FETCHING",
        })

        const { data, status } = await api.get(`auth/addresses/getByUser`, { validateStatus: () => true });
        dispatch({ type: "USER_ADDRESS", payload: data });
        dispatch({ type: "IS_SUCCESS" })
    } catch (error) {
        console.log("The error is ", error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user's addresss",
        })
    }
};

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
};

export const deleteUserAddress =
    (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {

        try {
            dispatch({
                type: "BUTTON_LOADER",
            })

            await api.delete(`auth/addresses/delete/${addressId}`);
            dispatch({ type: "IS_SUCCESS" });
            dispatch(getUserAddressess());
            dispatch(clearCheckoutAddress());
            toast.success("Address Deleted Successfully");
        } catch (error) {
            console.log("The error is ", error);
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Some error occured",
            })
            // console.log("Response data:", error.response.data);
            // console.log("Response status:", error.response.status);
            // console.log("Response headers:", error.response.headers);
        } finally {
            setOpenDeleteModal(false);
        }
    };

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};

export const analyticsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/auth/admin/analytics');
        dispatch({
            type: "FETCH_ANALYTICS",
            payload: data,
        })
        dispatch({ type: "IS_SUCCESS" })
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch analytics data",
        });
    }
};


export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};


export const createUserCart = (sendCartItems) => async (dispatch, getState) => {

    console.log("Create cart is happening");

    try {
        dispatch({
            type: "IS_FETCHING",
        });
        await api.post(`auth/cart/create`, sendCartItems);
        await dispatch(getUserCart());


    } catch (error) {
        console.log("The error is ", error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
        })
    }
};

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: "IS_FETCHING",
        });
        const { data } = await api.get(`/auth/cart/users/getCartById`);

        console.log("API response:", data);

        const cartItems = Array.isArray(data.products)
            ? data.products
            : [];
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: cartItems,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        dispatch({
            type: "IS_SUCCESS"
        });

    } catch (error) {
        console.log("The error is ", error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
        })
    }
};


export const createStripePaymentSecret =
    (sendData) => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING", });
            console.log("Sending to backend:", sendData);
            const { data } = await api.post("/auth/order/stripe-client-secret", sendData);

            dispatch({ type: "CLIENT_SECRET", payload: data });
            localStorage.setItem("client-secret", JSON.stringify(data));
            dispatch({ type: "IS_SUCCESS" });

        } catch (error) {
            console.log("Error is", error.message);
            toast.error(error?.response?.data?.message || "Failed to create client secret");
        }
    };



export const stripePaymentConfirmation =
    (sendData, setErrorMessage, setLoading, toast) => async (dispatch, getState) => {
        console.log("Inside the payment confirmation");

        try {
            setLoading(true);
            const response = await api.post(`/auth/order/users/payments/${sendData.paymentMethod}`, sendData);
            console.log(response);
            if (response.data) {
                console.log("Inside if", response);

                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
                dispatch({ type: "CLEAR_CART" });
                toast.success("Order Accepted");
                setLoading(false);
            } else {
                setErrorMessage("Payment failed, please try again !");
            }


        } catch (error) {
            setErrorMessage("Payment failed, please try again !");
        }
    };


export const getOrdersForDashboard = (queryString, isAdmin) => async (dispatch) => {


    try {
        dispatch({
            type: "IS_LOADING",
        })

        const endpoint = isAdmin ? "/auth/order/admin/orders" : "/auth/order/seller/orders"
        const { data, status } = await api.get(`${endpoint}?${queryString}`, {
            validateStatus: () => true,
        });

        console.log("data is", data.content);

        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        })
        dispatch({
            type: "IS_SUCCESS",
        })
    } catch (error) {
        console.log("The error is ", error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch orders data",
        })
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
    }
};

export const updateOrderStatusFromDashboard =
    (orderId, orderStatus, toast, setLoader, isAdmin) => async (dispatch, getState) => {
        try {
            setLoader(true);
            const endpoint = isAdmin ? "/auth/order/admin/orders/" : "/auth/order/seller/orders/";
            const { data } = await api.put(`${endpoint}${orderId}/status`, { status: orderStatus });
            toast.success(data.message || "Order updated successfully");
            await dispatch(getOrdersForDashboard());
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
    };

export const getUserOrders = () => async (dispatch) => {
    const requestId = ++latestUserOrdersRequestId;

    try {
        dispatch({ type: "RESET_USER_ORDERS" });
        dispatch({ type: "GET_USER_ORDERS_LOADING" });

        const endpoint = `/auth/order/profile/order`;
        const { data } = await api.get(endpoint, {
            validateStatus: () => true,
        });

        if (requestId !== latestUserOrdersRequestId) return;

        const orders = data?.content ?? data ?? [];
        dispatch({
            type: "GET_USER_ORDERS_SUCCESS",
            payload: orders,
        });
    } catch (error) {
        if (requestId !== latestUserOrdersRequestId) return;

        console.log("The error is ", error);
        dispatch({
            type: "GET_USER_ORDERS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user orders",
        });
    }
};

export const dashboardProductAction = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({
            type: "IS_FETCHING",
        })

        const endpoint = isAdmin ? "/auth/product/admin/get" : "/auth/product/seller/get";
        const { data, status } = await api.get(`${endpoint}?${queryString}`, {
            validateStatus: () => true,
        });

        console.log(data.content);

        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        })
        dispatch({
            type: "IS_SUCCESS",
        })
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch dashboard products",
        })
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
    }
};

export const updateProductFromDashboard =
    (sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
        try {
            setLoader(true);
            await api.put(`/auth/product/admin/products/${sendData.id}`, sendData);
            toast.success("Product updated Successfully");
            reset();
            setLoader(false);
            setOpen(false);
            await dispatch(dashboardProductAction());
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.description || "Product Update Failed");
        }
    };

export const deleteProduct =
    (setLoader, productId, toast, setOpenDeleteModal) => async (dispatch, getState) => {

        try {
            setLoader(true);
            await api.delete(`auth/product/admin/products/${productId}`);
            toast.success("Product Deleted Successfully");
            await dispatch(dashboardProductAction());
            setLoader(false);
            setOpenDeleteModal(false);
        } catch (error) {
            console.log("The error is ", error);
            toast.error(
                error?.response?.data?.message || "Some error occured"
            );
        }
    };


export const updateProductImageFromDashboard =
    (formData, productId, toast, setLoader, setOpen) => async (dispatch) => {
        try {
            setLoader(true);
            await api.put(`/auth/product/${productId}/image`, formData);
            toast.success("Image Upload Successfully");
            setLoader(false);
            setOpen(false);
            await dispatch(dashboardProductAction());
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.description || "Product Image Update Failed");
        }
    };

export const addNewProductFromDashboard =
    (sendData, toast, reset, setLoader, setOpen) => async (dispatch, getState) => {
        try {
            setLoader(true);
            await api.post(`auth/product/add/${sendData.categoryId}`, sendData);
            toast.success("Product Created Successfully");
            reset();
            setOpen(false);
            await dispatch(dashboardProductAction());
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.description || "Product Creation Failed !!");
        } finally {
            setLoader(false);
        }
    };


export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
    dispatch({ type: "CATEGORY_LOADING" });
    try {
        const { data } = await api.get(`/auth/category/get?${queryString}`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data["content"],
            pageNumber: data["pageNumber"],
            pageSize: data["pageSize"],
            totalElements: data["totalElements"],
            totalPages: data["totalPages"],
            lastPage: data["lastPage"],
        });

        dispatch({ type: "CATEGORY_SUCCESS" });
    } catch (err) {
        console.log(err);

        dispatch({
            type: "IS_ERROR",
            payload: err?.response?.data?.message || "Failed to fetch categories",
        });
    }
};

export const createCategoryDashboardAction =
    (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
        try {
            dispatch({ type: "CATEGORY_LOADING" });
            await api.post("/auth/category/add", sendData);
            dispatch({ type: "CATEGORY_SUCCESS" });
            reset();
            toast.success("Category Created Successful");
            setOpen(false);
            // await dispatch(getAllCategoriesDashboard());
            await dispatch(getAllCategoriesDashboard("pageNumber=0"));
        } catch (err) {
            console.log(err);
            toast.error(
                err?.response?.data?.categoryName || "Failed to create new category"
            );

            dispatch({
                type: "IS_ERROR",
                payload: err?.response?.data?.message || "Internal Server Error",
            });
        }
    };



export const updateCategoryDashboardAction =
    (sendData, setOpen, reset, toast) =>

        //   (sendData, setOpen, category, reset, toast) =>
        async (dispatch, getState) => {
            try {
                dispatch({ type: "CATEGORY_LOADING" });

                await api.put(`/auth/category/update`, sendData);

                //   await api.put(`/admin/categories/${categoryID}`, sendData);

                dispatch({ type: "CATEGORY_SUCCESS" });

                reset();
                toast.success("Category Update Successful");
                setOpen(false);
                await dispatch(getAllCategoriesDashboard());
            } catch (err) {
                console.log(err);
                toast.error(
                    err?.response?.data?.categoryName || "Failed to update category"
                );

                dispatch({
                    type: "IS_ERROR",
                    payload: err?.response?.data?.message || "Internal Server Error",
                });
            }
        };

export const deleteCategoryDashboardAction =
    (setOpen, categoryID, toast) => async (dispatch, getState) => {
        try {
            dispatch({ type: "CATEGORY_LOADER" });

            await api.delete(`/auth/category/delete/${categoryID}`);

            dispatch({ type: "CATEGORY_SUCCESS" });

            toast.success("Category Delete Successful");
            setOpen(false);
            await dispatch(getAllCategoriesDashboard());
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Failed to delete category");
            dispatch({
                type: "IS_ERROR",
                payload: err?.response?.data?.message || "Internal Server Error",
            });
        }
    };



export const getAllSellersDashboard =
    (queryString) => async (dispatch, getState) => {
        const { user } = getState().auth;
        try {
            dispatch({ type: "IS_FETCHING" });
            const { data } = await api.get(`/auth/sellers?${queryString}`);
            dispatch({
                type: "GET_SELLERS",
                payload: data["content"],
                pageNumber: data["pageNumber"],
                pageSize: data["pageSize"],
                totalElements: data["totalElements"],
                totalPages: data["totalPages"],
                lastPage: data["lastPage"],
            });

            dispatch({ type: "IS_SUCCESS" });
        } catch (err) {
            console.log(err);
            dispatch({
                type: "IS_ERROR",
                payload: err?.response?.data?.message || "Failed to fetch sellers data",
            });
        }
    };

export const addNewDashboardSeller =
    (sendData, toast, reset, setOpen, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            await api.post("/register", sendData);
            reset();
            toast.success("Seller registered successfully!");

            await dispatch(getAllSellersDashboard());
        } catch (err) {
            console.log(err);
            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.password ||
                "Internal Server Error"
            );
        } finally {
            setLoader(false);
            setOpen(false);
        }
    };

