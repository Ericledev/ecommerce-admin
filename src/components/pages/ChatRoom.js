import classes from "./ChatRoom.module.css";
import BannerShop from "../banner/BannerShop";
import admin_icon from "../../asset/admin-icon.svg";
import MessengerWindow from "../chat/messenger-window";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addMessageAPI, getChatRoomAPI } from "../lib/api-chat";
import openSocket from "socket.io-client";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { chatRooms } = useSelector((state) => state.chatReducer);
  const { user } = useSelector((state) => state.logInReducer);
  const [chooseRoom, setChooseRoom] = useState(null);
  const refChatContent = useRef();
  const refChooseRoom = useRef();
  const [socket, setSocket] = useState(null);
  const [adminTyping, setAdminTyping] = useState();
  refChooseRoom.current = chooseRoom;
  // console.log("GET CHAT ROOMS: ", chatRooms);
  useEffect(() => {
    // listen at "ADMIN_CHANNEL"
    socket?.on("ADMIN_CHANNEL", (data) => {
      if (data.action === "reply") {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            user: "client",
            roomId: data.roomId,
            message: data.message,
          },
        });
      }
      // console.log("CEHCK DATA TYPING: ", data);
      // console.log("Choose channel chooseRoom._id: ", refChooseRoom.current);
      if (
        data.action === "START_TYPING" &&
        data.roomId === refChooseRoom.current._id
      ) {
        setAdminTyping("Client is typing ...");
      } else {
        setAdminTyping("");
      }
      if (data.action === "ONLINE") {
        console.log("CHECK ONLINE: ", data);
      }
      if (data.action === "OFFLINE") {
        console.log("CHECK OFFLINE: ", data);
      }
    });
    return () => {
      socket?.disconnect();
    };
  }, [socket]);
  // move scroll to the bottom
  useEffect(() => {
    refChatContent.current.scrollTop = refChatContent.current.scrollHeight;
  }, [chatRooms]);
  // componentDidMount
  useEffect(() => {
    dispatch({ type: "ACTIVE_CHAT_ROOM_PAGE" });
    dispatch(getChatRoomAPI());
    // open connection
    setSocket(openSocket(`${process.env.REACT_APP_DOMAIN}`));
  }, []);
  const chooseRoomChatHandler = (room) => {
    setChooseRoom(room);
  };
  // list out contact list
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
    // add message on redux
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        user: user.userId,
        roomId: chooseRoom._id,
        message: message,
      },
    });
    // add message on server
    dispatch(
      addMessageAPI({
        user: user.userId,
        roomId: chooseRoom._id,
        message: message,
      })
    );
    console.log("CHECK SEND MESSAGE: ", {
      roomId: chooseRoom._id,
      message: message,
    });
  };
  // emit when clien typing
  const typingHandler = (status) => {
    console.log("CHECK CHOOSE ROOM: ", chooseRoom);
    console.log("CHECK user: ", user);
    if (status === "START") {
      socket.emit("TYPING", {
        action: "START_TYPING",
        roomId: chooseRoom._id,
        userId: user.userId,
      });
      return;
    }
    if (status === "STOP") {
      socket.emit("TYPING", {
        action: "STOP_TYPING",
        roomId: chooseRoom._id,
        userId: user.userId,
      });
      return;
    }
  };
  return (
    <div className={classes["chat-room-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "CHAT ROOM" }} />
      <div className={classes["chat-room-content"]}>
        <div className={classes["room-list"]}>
          <div className={classes["search-box"]}>
            <input type="text" placeholder="Search contact" />
          </div>
          <div className={classes["list"]}>{contactList}</div>
        </div>
        <div className={classes["conversation"]}>
          <MessengerWindow
            conversation={chooseRoom && chooseRoom.conversation}
            onSendMessage={sendMessageHandler}
            onTypingHandler={typingHandler}
            adminTyping={adminTyping}
            ref={refChatContent}
          />
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;
