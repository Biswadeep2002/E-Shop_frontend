const initialState = {
    isLoading: false,
    errorMessage: null,
    checkoutLoading: false,
    categoryLoader: false,
    categoryError: null,
    btnLoader: false,
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "IS_LOADING":
        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };
        case "BUTTON_LOADER":
            return {
                ...state,
                btnLoader: true,
                errorMessage: null,
                categoryError: null,
            };

        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                btnLoader: false,
                categoryError: null,
                categoryLoader: false,
            };

        case "IS_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                btnLoader: false,
                categoryLoader: false,
            };

        case "CATEGORY_SUCCESS":
            return {
                ...state,
                categoryLoader: false,
                categoryError: null,
            };

        case "CATEGORY_LOADING":
            return {
                ...state,
                categoryLoader: true,
                errorMessage: null,
            };

        case "CHECKOUT_LOADING":
            return {
                ...state,
                checkoutLoading: true,
                errorMessage: null,
            };

        case "CHECKOUT_LOADING_SUCCESS":
            return {
                ...state,
                checkoutLoading: false,
            };

        case "CHECKOUT_LOADING_ERROR":
            return {
                ...state,
                checkoutLoading: false,
                errorMessage: action.payload,
            };

        default:
            return state;
    }
};

export default errorReducer;