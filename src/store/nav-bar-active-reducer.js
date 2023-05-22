const initialNavBar = {
  loginPage: false,
  chatRoomPage: false,
  productPage: false,
};

const navBarActiveReducer = (state = initialNavBar, action) => {
  switch (action.type) {
    case "ACTIVE_LOGIN_PAGE":
      return {
        loginPage: true,
        chatRoomPage: false,
        productPage: false,
      };
    case "ACTIVE_CHAT_ROOM_PAGE":
      return {
        loginPage: false,
        chatRoomPage: true,
        productPage: false,
      };
    case "ACTIVE_PRODUCT_PAGE":
      return {
        loginPage: false,
        chatRoomPage: false,
        productPage: true,
      };
    default:
      return state;
  }
};
export default navBarActiveReducer;
