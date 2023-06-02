const initialState = {
  productList: [],
  succeed: false,
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
  if (action.type === "UPDATE") {
    const productListUpdated = state.productList.map((item) => {
      if (item._id === action.payload._id) {
        item = action.payload;
      }
      return item;
    });
    return {
      productList: [...productListUpdated],
      succeed: true,
    };
  }
  if (action.type === "ADD_NEW") {
    return {
      productList: [...state.productList, action.payload],
      succeed: true,
    };
    // state.productList.push(action.payload);
  }
  if (action.type === "CLEAR_SUCCEED") {
    return {
      succeed: false,
    };
  }

  return state;
};
export default productReducer;
