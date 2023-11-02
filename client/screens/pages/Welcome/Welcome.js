import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp, ZoomIn, ZoomOut } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { AuthContext } from "../../../context/AuthContex";
import * as Progress from "react-native-progress";

export default function Welcome() {
  const navigate = useNavigation();
  const [seePassword, setseePassword] = useState(false);
  const { login, currentUser } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (name, text) => {
    setInputs({ ...inputs, [name]: text });
  };
  const handleLogin = async () => {
    if (!inputs.username || !inputs.password) {
      Alert.alert("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await login(inputs);
      navigate.navigate("Drawer");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(error.response.data.error);
    }
  };

  return (
    <View className="flex-1">
      <>
        <StatusBar style="auto" />
        <Animated.Image
          source={require("../../../assets/bg1.jpg")}
          style={{ height: hp("110%"), width: wp("100%") }}
        />
        <SafeAreaView className="absolute w-full h-full items-center justify-center">
          <Animated.View
            className=" bg-blue-300 p-4 rounded-full"
            entering={ZoomIn.duration(300).springify()}
            exiting={ZoomOut.delay(800).duration(300)}
          >
            <Animated.View
              className=" bg-blue-200 p-4 rounded-full"
              entering={ZoomIn.duration(300).delay(100).springify()}
              exiting={ZoomOut.delay(950).duration(300)}
            >
              <Animated.Image
                source={require("../../../assets/bg2.jpg")}
                style={{ width: wp("50%"), height: wp("50%") }}
                className="rounded-full p-2"
                entering={ZoomIn.duration(300).delay(200).springify()}
                exiting={ZoomOut.delay(1050).duration(300)}
              />
            </Animated.View>
          </Animated.View>
          {!currentUser && (
            <Animated.View
              className="space-y-4 mt-10"
              entering={FadeInDown.delay(2500).duration(2500).springify()}
            >
              <Animated.View
                className="bg-neutral-200  rounded-2xl"
                style={{ width: wp("90%") }}
              >
                <TextInput
                  autoComplete="username"
                  onChangeText={(text) => handleInputChange("username", text)}
                  placeholder="Username"
                  textContentType="username"
                  className="p-3"
                />
              </Animated.View>
              <Animated.View
                className="bg-neutral-200  rounded-2xl flex-row items-center justify-between p-1"
                style={{ width: wp("90%") }}
              >
                <TextInput
                  autoComplete="password"
                  placeholder="Password"
                  onChangeText={(text) => handleInputChange("password", text)}
                  secureTextEntry={seePassword}
                  className="p-3"
                  style={{ width: wp(80) }}
                  textContentType={seePassword ? "username" : "password"}
                />
                <TouchableOpacity onPress={() => setseePassword((pre) => !pre)}>
                  {seePassword ? (
                    <EyeIcon color={"black"} strokeWidth={2} size={wp(7)} />
                  ) : (
                    <EyeSlashIcon
                      color={"black"}
                      strokeWidth={2}
                      size={wp(7)}
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>
              <Animated.View className="mt-10" style={{ width: wp("90%") }}>
                <TouchableOpacity
                  className="w-full bg-sky-400 p-3 rounded-2xl mb-3 items-center"
                  disabled={!inputs.username || !inputs.password}
                  onPress={handleLogin}
                >
                  <Text className="p-1 text-white font-medium">Login</Text>
                </TouchableOpacity>
                <View className="w-full items-center">
                  <Text className="p-1 text-white font-medium text-base flex-row items-center justify-center">
                    Not Registered{" "}
                    <TouchableOpacity
                      onPress={() => navigate.navigate("Register")}
                    >
                      <Text className="text-blue-400 self-center">
                        Sign up?
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </Animated.View>
            </Animated.View>
          )}
        </SafeAreaView>
      </>
      {Loading && (
        <Animated.View
          className="absolute z-50 top-0 left-0 flex-1 items-center justify-center w-full h-full"
          style={{ backgroundColor: "#0000006e" }}
          entering={FadeInUp.duration(700)}
        >
          <Progress.CircleSnail
            size={wp(45)}
            color={["red", "green", "blue"]}
            thickness={3}
          />
        </Animated.View>
      )}
    </View>
  );
}
