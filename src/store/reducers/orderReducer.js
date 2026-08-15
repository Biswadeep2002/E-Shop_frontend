const initialState = {
    adminOrder: null,
    userOrders: null,
    ordersLoading: false,
    ordersError: null,
    pagination: {},
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ADMIN_ORDERS":
            return {
                ...state,
                adminOrder: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    lastPage: action.lastPage,
                },
            };
        case "GET_USER_ORDERS_LOADING":
            return {
                ...state,
                ordersLoading: true,
                ordersError: null,
                userOrders: null,
            };
        case "GET_USER_ORDERS_SUCCESS":
            return {
                ...state,
                ordersLoading: false,
                ordersError: null,
                userOrders: action.payload,
            };
        case "GET_USER_ORDERS_ERROR":
            return {
                ...state,
                ordersLoading: false,
                ordersError: action.payload,
                userOrders: null,
            };
        case "RESET_USER_ORDERS":
            return {
                ...state,
                userOrders: null,
                ordersLoading: false,
                ordersError: null,
                pagination: {},
            };
        case "LOG_OUT":
            return {
                ...state,
                adminOrder: null,
                userOrders: null,
                ordersLoading: false,
                ordersError: null,
                pagination: {},
            };
        default:
            return state;
    }
};