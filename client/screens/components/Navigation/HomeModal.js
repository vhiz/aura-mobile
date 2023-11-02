import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../pages/Home/Home";
import FullPost from "../fullPost/FullPost";

export default function HomeModal() {
  const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name="HomeModal" component={Home} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="FullPost" component={FullPost} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
