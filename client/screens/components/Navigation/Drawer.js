import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabs from "./HomeTabs";
import SideBar from "../sideBar/SideBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Drawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: wp("65%"),
        },
      }}
      drawerContent={(props) => <SideBar {...props} />}
    >
      <Drawer.Screen name="HomeTab" component={HomeTabs} />
    </Drawer.Navigator>
  );
}
