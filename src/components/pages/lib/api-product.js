import setHearder from "./set_hearder_auth";

// import setHearder from "./set_hearder_auth";
export const getAllProductAPI = () => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN + "/product/get-all-products"
    );
    // 200 = ok
    if (res.status === 200) {
      const data = await res.json();
      dispatch({ type: "GET_ALL_PRODUCT", payload: data });
    }
  };
};
export const deleteProductAPI = (productId) => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN +
        `/product/delete-product?productId=${productId}`,
      {
        method: "DELETE",
        headers: setHearder({
          "Content-Type": "application/json",
        }),
      }
    );
    // 200 = ok
    if (res.status === 200) {
      dispatch({ type: "DELETE", payload: productId });
    }
  };
};
export const updateProductAPI = (product) => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN + `/product/update-product`,
      {
        method: "POST",
        headers: setHearder({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(product),
      }
    );
    // 200 = ok
    if (res.status === 200) {
      dispatch({ type: "UPDATE", payload: product });
    }
  };
};
