import React, { useContext, useEffect, useRef, useState } from "react";
import MessagesStyle from "./Css/MessagesStyle.css";
import { AuthContext } from "@/app/Context/AuthContext";
import useChatStore from "@/app/hooks/useMessages";
import useConversation from "@/app/zustand/useConversation";
import Skeleton from "./Skeleton";
import useListenMessage from "@/app/hooks/useListenMessage";

const Messages = ({ selectedUser }) => {
  const { ZustandmessagesArray } = useConversation();
  const { AuthData } = useContext(AuthContext);
  useListenMessage();

  const { sendMessage } = useChatStore();
  const [text, settext] = useState({
    text: "",
  });
  const inputRef = useRef(null);
  const messageDisplayRef = useRef(null); // Ref for message-display div

  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString("en-Us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handlesubmit = () => {
    sendMessage(selectedUser.id, AuthData.jwtToken, text);
    inputRef.current.value = ""; // Clear the input field
  };

  useEffect(() => {
    // Auto-scroll to the bottom when conversation changes
    if (messageDisplayRef.current) {
      messageDisplayRef.current.scrollTop =
        messageDisplayRef.current.scrollHeight;
    }

    console.log("ZustandmessagesArray Data", ZustandmessagesArray);
  }, [ZustandmessagesArray]);

  return (
    <>
      <header>
        <img src={selectedUser.profilepic} alt={selectedUser.username} />{" "}
        {selectedUser.name}
      </header>
      <div className="message-box">
        {/* Message ChatBOx */}
        <div
          className="message-display"
          ref={messageDisplayRef} // Attach ref here
          style={{ overflowY: "auto", maxHeight: "588px" }} // Ensure scrolling is enabled
        >
          {/* Message ChatBOx */}

          {!ZustandmessagesArray ? (
            <Skeleton />
          ) : (
            ZustandmessagesArray.map((message) => (
              <div
                key={message._id}
                className={`message ${
                  message.senderId === AuthData.userId ? "sent" : "received"
                } `}
              >
                <h1 style={{ fontSize: "13px" }}>{message.text}</h1>
                <h1 style={{ fontSize: "8px", textAlign: "right" }}>
                  {formatMessageTime(message.createdAt)}
                </h1>
              </div>
            ))
          )}
        </div>

        {/* Message Inputs */}
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            ref={inputRef}
            onChange={(e) => {
              settext({ ...text, text: e.target.value });
            }}
          />
          <button type="submit" onClick={(e) => handlesubmit()}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Messages;
