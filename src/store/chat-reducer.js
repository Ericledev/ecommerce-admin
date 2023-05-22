const initialStateChat = {
  chatRooms: null,
};

const chatReducer = (state = initialStateChat, action) => {
  switch (action.type) {
    case "GET_ROOM":
      return {
        chatRooms: action.payload.data,
      };
    case "ADD_MESSAGE":
      const chatRoomList = state.chatRooms.map((item) => {
        if (item._id === action.payload.roomId) {
          item.conversation.push({
            user: action.payload.roomId,
            message: action.payload.message,
          });
        }
        return item;
      });

      return {
        chatRooms: [...chatRoomList],
      };
    default:
      return state;
  }
};

export default chatReducer;
