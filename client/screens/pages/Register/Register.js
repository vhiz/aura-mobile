import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, ZoomIn, ZoomOut } from "react-native-reanimated";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { AuthContext } from "../../../context/AuthContex";

export default function Welcome() {
  const navigate = useNavigation();
  const [seePassword, setseePassword] = useState(false);
  const { register } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    phoneno: "",
  });
  const handleInputChange = (name, text) => {
    setInputs({ ...inputs, [name]: text });
  };
  const handleRegister = async () => {
    if (
      !inputs.email ||
      !inputs.username ||
      !inputs.name ||
      !inputs.password ||
      !inputs.phoneno
    ) {
      Alert.alert("All fields are required");
      return;
    }
    try {
      await register(inputs);
      navigate.navigate("Welcome");
    } catch (error) {
      Alert.alert(error.response.data);
    }
  };

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <Animated.Image
        source={require("../../../assets/bg1.jpg")}
        style={{ height: hp("110%"), width: wp("100%") }}
      />
      <SafeAreaView className="absolute w-full h-full items-center justify-center">
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
          <Animated.View
            className="space-y-4 mt-10"
            entering={FadeInDown.delay(2500).duration(2500).springify()}
          >
            <Animated.View
              className="bg-neutral-200  rounded-2xl"
              style={{ width: wp("90%") }}
            >
              <TextInput
                autoComplete="email"
                onChangeText={(text) => handleInputChange("email", text)}
                placeholder="Email"
                className="p-2"
                textContentType="emailAddress"
              />
            </Animated.View>
            <Animated.View
              className="bg-neutral-200  rounded-2xl"
              style={{ width: wp("90%") }}
            >
              <TextInput
                autoComplete="additional-name"
                onChangeText={(text) => handleInputChange("name", text)}
                placeholder="FullName"
                className="p-2"
                textContentType="name"
              />
            </Animated.View>
            <Animated.View
              className="bg-neutral-200  rounded-2xl"
              style={{ width: wp("90%") }}
            >
              <TextInput
                autoComplete="username"
                onChangeText={(text) => handleInputChange("username", text)}
                placeholder="UserName"
                className="p-2"
                textContentType="username"
              />
            </Animated.View>
            <Animated.View
              className="bg-neutral-200  rounded-2xl"
              style={{ width: wp("90%") }}
            >
              <TextInput
                autoComplete="tel"
                onChangeText={(text) => handleInputChange("phoneno", text)}
                placeholder="Phone no"
                keyboardType="numeric"
                className="p-2"
                textContentType="telephoneNumber"
              />
            </Animated.View>
            <Animated.View
              className="bg-neutral-200  rounded-2xl flex-row items-center justify-between p-1"
              style={{ width: wp("90%") }}
            >
              <TextInput
                autoComplete="password"
                onChangeText={(text) => handleInputChange("password", text)}
                placeholder="Password"
                secureTextEntry={seePassword}
                className="p-2"
                style={{ width: wp(80) }}
                textContentType={seePassword ? "username" : "password"}
              />
              <TouchableOpacity onPress={() => setseePassword((pre) => !pre)}>
                {seePassword ? (
                  <EyeIcon color={"black"} strokeWidth={2} size={wp(7)} />
                ) : (
                  <EyeSlashIcon color={"black"} strokeWidth={2} size={wp(7)} />
                )}
              </TouchableOpacity>
            </Animated.View>
            <Animated.View className="mt-10" style={{ width: wp("90%") }}>
              <TouchableOpacity
                className="w-full bg-sky-400 p-3 rounded-2xl mb-3 items-center"
                onPress={handleRegister}
              >
                <Text className="p-1 text-white font-medium">Register</Text>
              </TouchableOpacity>
              <View className="w-full items-center">
                <Text className="p-1 text-white font-medium text-base flex-row items-center justify-center">
                  Have an account{" "}
                  <TouchableOpacity
                    onPress={() => navigate.navigate("Welcome")}
                  >
                    <Text className="text-blue-400 self-center">Sign in?</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
