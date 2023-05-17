const initialState = {
  productList: [],
};

const productReducer = (state = initialState, action) => {
  // console.log("CHECK ACTION: ", action);
  if (action.type === "GET_ALL_PRODUCT")
    return {
      productList: [...action.payload.data],
    };

  if (action.type === "DELETE") {
    // state.productList.splice(action.payload, 1);
    const temp = state.productList.filter(
      (item) => item._id !== action.payload
    );
    return {
      productList: [...temp],
    };
  }

  return state;
};
export default productReducer;
