import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../../pages/Welcome/Welcome";
import Drawer from "./Drawer";
import Register from "../../pages/Register/Register";
import { AuthContext } from "../../../context/AuthContex";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { currentUser } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        {currentUser ? (
          <Stack.Screen name="Drawer" component={Drawer} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
