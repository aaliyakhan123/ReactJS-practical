import axios from "axios";

const API = "http://localhost:3000/products";

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get(API);

  dispatch({
    type: "SET_PRODUCTS",
    payload: res.data
  });
};

export const addProduct = (product) => async (dispatch) => {
  const res = await axios.post(API, product);

  dispatch({
    type: "ADD_PRODUCT",
    payload: res.data
  });
};

export const deleteProduct = (id) => async (dispatch) => {
  await axios.delete(`${API}/${id}`);

  dispatch({
    type: "DELETE_PRODUCT",
    payload: id
  });
};

export const updateProduct = (product) => async (dispatch) => {
  const res = await axios.put(`${API}/${product.id}`, product);

  dispatch({
    type: "UPDATE_PRODUCT",
    payload: res.data
  });
};

export const login = (user) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));

  dispatch({
    type: "LOGIN",
    payload: user
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  dispatch({
    type: "LOGOUT"
  });
};