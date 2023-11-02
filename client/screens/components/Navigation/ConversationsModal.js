import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversations from "../../pages/Conversations/Conversations";
import Messages from "../Messages/Messages";

export default function ConversationsModal() {
  const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name="ConversationsModal" component={Conversations} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="Messages" component={Messages} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
