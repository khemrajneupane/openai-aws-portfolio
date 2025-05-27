"use client";

import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import io, { Socket } from "socket.io-client";
//import { useSession } from "next-auth/react";
import "./SocketChat.css";

interface MessageEvent {
  from: string;
  message: string;
}

type Timeout = ReturnType<typeof setTimeout> | null;

const socket: Socket = io("https://socket-io-live-chat.onrender.com/");

const SocketChat: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [typingUser, setTypingUser] = useState<string>("");
  const [hasFetchedUsers, setHasFetchedUsers] = useState(false); // NEW

  const chatPopupRef = useRef<Window | null>(null);
  const typingTimeoutRef = useRef<Timeout>(null);
  const isTyping = useRef<boolean>(false);
  //const { data } = useSession();

  useEffect(() => {
    socket.on("privateMessage", ({ from, message }: MessageEvent) => {
      setChatLog((prev) => [...prev, `${from} (private): ${message}`]);
    });

    socket.on("publicMessage", ({ from, message }: MessageEvent) => {
      setChatLog((prev) => [...prev, `${from} (to all): ${message}`]);
    });

    socket.on("usersList", (usernames: string[]) => {
      setUsers(usernames);
      setHasFetchedUsers(true);
    });

    socket.on("typing", (user: string) => {
      setTypingUser(`${user} is typing...`);
    });

    socket.on("stopTyping", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("privateMessage");
      socket.off("publicMessage");
      socket.off("usersList");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  const handleRegister = () => {
    if (username) {
      socket.emit("register", username);
    }
  };

  const handleSend = () => {
    if (!message) return;

    if (recipient) {
      socket.emit("privateMessage", {
        from: username,
        to: recipient,
        message,
      });
      setChatLog((prev) => [...prev, `You (to ${recipient}): ${message}`]);
    } else {
      socket.emit("publicMessage", {
        from: username,
        message,
      });
    }

    setMessage("");
    socket.emit("stopTyping");
    isTyping.current = false;
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  const handleRecipientClick = () => {
    // Emit only once per input focus
    if (!hasFetchedUsers) {
      socket.emit("getUsers");
    }
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (!isTyping.current && username) {
      socket.emit("typing", username);
      isTyping.current = true;
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping");
      isTyping.current = false;
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleOpenNewChatWindow = () => {
    // Prevent opening inside an already opened popup
    if (typeof window !== "undefined" && window.opener) return;

    if (!chatPopupRef.current || chatPopupRef.current.closed) {
      chatPopupRef.current = window.open(
        "/socketio-chat-popup",
        "_blank",
        "width=600,height=700,scrollbars=yes,resizable=yes"
      );
      if (chatPopupRef.current) chatPopupRef.current.focus();
    } else {
      chatPopupRef.current.focus();
    }
  };

  return (
    <div className="chat-container">
      <header>
        <h2>Live Chat with SOCKET.IO</h2>
      </header>

      {chatLog.length > 0 && (
        <section className="chat-log">
          <ul>
            {chatLog.map((msg, idx) => (
              <li key={idx} className={msg.includes("You") ? "you" : ""}>
                {msg}
              </li>
            ))}
          </ul>
          {typingUser && <div className="typing-indicator">{typingUser}</div>}
        </section>
      )}

      <section className="user-inputs">
        <div className="input-group">
          <label>Your name (optional):</label>
          <input
            type="text"
            placeholder="e.g. Khem"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleRegister}
            onClick={handleOpenNewChatWindow}
          />
        </div>

        <div className="input-group">
          <label>Send to (optional):</label>
          <input
            type="text"
            placeholder="Choose recipient"
            value={recipient}
            onClick={handleRecipientClick}
            onChange={(e) => setRecipient(e.target.value)}
            onBlur={(e) => {
              if (e.target.value.trim() === "") {
                setRecipient("");
              }
            }}
            list="usernames"
          />
          <datalist id="usernames">
            {[...users].reverse().map((u) => (
              <option key={u} value={u} />
            ))}
          </datalist>
        </div>

        <div className="input-group message-box">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </section>
    </div>
  );
};

export default SocketChat;
