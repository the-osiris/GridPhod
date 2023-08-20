import * as actionTypes from "../constants/productConstant";

export const getProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return { products: action.payload };
    case actionTypes.GET_PRODUCTS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const getDodReducer = (state = { dod: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_DOD_SUCCESS:
      return { dod: action.payload };
    case actionTypes.GET_DOD_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const getTopSelReducer = (state = { topsell: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_TOPSEL_SUCCESS:
      return { topsell: action.payload };
    case actionTypes.GET_TOPSEL_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const getFootwReducer = (state = { footw: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_FOOTW_SUCCESS:
      return { footw: action.payload };
    case actionTypes.GET_FOOTW_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const getApparReducer = (state = { appar: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_APPAR_SUCCESS:
      return { appar: action.payload };
    case actionTypes.GET_APPAR_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};
