const initialStateChat = {
  chatRooms: null,
  // roomIdList: null,
};

const chatReducer = (state = initialStateChat, action) => {
  switch (action.type) {
    case "GET_ROOM":
      return {
        chatRooms: action.payload.data,
        // roomIdList: action.payload.data.map((item) => item._id),
      };
    case "ADD_MESSAGE":
      // { user:sdkjfhs
      //   roomId: chooseRoom._id,
      //   message: message  }
      const chatRoomList = state.chatRooms.map((item) => {
        if (item._id === action.payload.roomId) {
          item.conversation.push({
            user: action.payload.user,
            message: action.payload.message,
          });
        }
        return item;
      });

      return {
        chatRooms: [...chatRoomList],
        // roomIdList: state.roomIdList,
      };
    default:
      return state;
  }
};

export default chatReducer;
