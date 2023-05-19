import classes from "./ChatRoom.module.css";
import BannerShop from "../banner/BannerShop";
import admin_icon from "../../asset/admin-icon.svg";
import MessengerWindow from "../chat/messenger-window";

const ChatRoom = () => {
  return (
    <div className={classes["chat-room-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "CHAT ROOM" }} />
      <div className={classes["chat-room-content"]}>
        <div className={classes["room-list"]}>
          <div className={classes["search-box"]}>
            <input type="text" placeholder="Search contact" />
          </div>
          <div className={classes["contact-list"]}>
            <img
              className={classes["admin-icon"]}
              src={admin_icon}
              alt="Admin icon"
            />
            <label> sdajkhfiure93857 </label>
          </div>
          <div className={classes["contact-list"]}>
            <img
              className={classes["admin-icon"]}
              src={admin_icon}
              alt="Admin icon"
            />
            <label> sdajkhfiure93857 </label>
          </div>
        </div>
        <div className={classes["conversation"]}>
          <MessengerWindow />
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;
