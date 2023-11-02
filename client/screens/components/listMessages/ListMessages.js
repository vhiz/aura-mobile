import { Text, ScrollView } from "react-native";
import MessageList from "../messageList/MessageList";

export default function ListMessages({ friends }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ marginVertical: 20 }}
    >
      <Text className="font-semibold text-neutral-400 text-lg mb-2">
        Messages
      </Text>

      {friends.map((item, i) => (
        <MessageList conversation={item} i={i} key={i} />
      ))}
    </ScrollView>
  );
}
