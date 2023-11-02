import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../pages/Profile/Profile";
import Update from "../Update/Update";

export default function ProfileModal() {
  const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name="ProfileModal" component={Profile} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="Update" component={Update} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
