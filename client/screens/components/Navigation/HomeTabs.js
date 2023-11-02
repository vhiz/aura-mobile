import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../Tab/Tab";
import Home from "../../pages/Home/Home";
import ProfileModal from "./ProfileModal";
import ConversationsModal from "./ConversationsModal";
import HomeModal from "./HomeModal";

export default function HomeTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeModal} />
      <Tab.Screen name="Conversations" component={ConversationsModal} />
      <Tab.Screen name="Profile" component={ProfileModal} />
    </Tab.Navigator>
  );
}
