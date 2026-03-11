const initialState = {
  products: [],
  user: JSON.parse(localStorage.getItem("user"))
};

function reducer(state = initialState, action) {

  switch (action.type) {

    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        )
      };

    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
}

export default reducer;