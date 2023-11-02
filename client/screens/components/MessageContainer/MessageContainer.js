import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import Message from "../Message/Message";
import { AuthContext } from "../../../context/AuthContex";

export default function MessageContainer({ user, messages, conversation }) {
  const scrollViewRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true, duation: 2000 });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={{ padding: 10 }}>
      {messages
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((message, i) => (
          <Message
            key={i}
            own={message.sender === currentUser._id}
            message={message}
            user={user}
            conversation={conversation}
          />
        ))}
    </ScrollView>
  );
}
