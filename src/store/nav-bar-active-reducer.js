const initialNavBar = {
  loginPage: false,
};

const navBarActiveReducer = (state = initialNavBar, action) => {
  switch (action.type) {
    case "ACTIVE_LOGIN_PAGE":
      return {
        loginPage: true,
      };

    default:
      return state;
  }
};
export default navBarActiveReducer;
