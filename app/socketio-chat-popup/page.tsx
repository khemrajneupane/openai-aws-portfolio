import SocketChat from "@/components/socket-chat/SocketChat";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-1/2 mx-auto">
      <h1>
        This is a new window for demo purpose, you can track chats in the main
        window
      </h1>
      <SocketChat />
    </div>
  );
};

export default LoginPage;
