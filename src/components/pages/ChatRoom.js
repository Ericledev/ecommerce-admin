import classes from "./ChatRoom.module.css";
import BannerShop from "../banner/BannerShop";
import admin_icon from "../../asset/admin-icon.svg";
import MessengerWindow from "../chat/messenger-window";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getChatRoomAPI } from "../lib/api-chat";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { chatRooms } = useSelector((state) => state.chatReducer);
  const [chooseRoom, setChooseRoom] = useState();

  console.log("GET CHAT ROOMS: ", chatRooms);
  useEffect(() => {
    dispatch({ type: "ACTIVE_CHAT_ROOM_PAGE" });
    dispatch(getChatRoomAPI());
  }, []);

  const chooseRoomChatHandler = (room) => {
    setChooseRoom(room);
  };

  const contactList =
    chatRooms &&
    chatRooms.map((item, index) => {
      return (
        <div className={classes["contact-list"]} key={index}>
          <img
            className={classes["admin-icon"]}
            src={admin_icon}
            alt="Admin icon"
          />
          <label onClick={chooseRoomChatHandler.bind(null, item)}>
            {" "}
            {item._id}{" "}
          </label>
        </div>
      );
    });

  const sendMessageHandler = (message) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        roomId: chooseRoom._id,
        message: message,
      },
    });
    console.log("CHECK SEND MESSAGE: ", {
      roomId: chooseRoom._id,
      message: message,
    });
  };
  return (
    <div className={classes["chat-room-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "CHAT ROOM" }} />
      <div className={classes["chat-room-content"]}>
        <div className={classes["room-list"]}>
          <div className={classes["search-box"]}>
            <input type="text" placeholder="Search contact" />
          </div>
          {contactList}
          {/* <div className={classes["contact-list"]}>
            <img
              className={classes["admin-icon"]}
              src={admin_icon}
              alt="Admin icon"
            />
            <label> sdajkhfiure93857 </label>
          </div> */}
        </div>
        <div className={classes["conversation"]}>
          <MessengerWindow
            conversation={chooseRoom && chooseRoom.conversation}
            onSendMessage={sendMessageHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;
