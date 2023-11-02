import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { sidebar } from "../../../data";
import { MoonIcon, SunIcon } from "react-native-heroicons/solid";
import { useColorScheme } from "nativewind";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContex";

export default function SideBar() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { logout, currentUser } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigation.navigate("HomeTab");
  };
  return (
    <SafeAreaView className=" bg-white p-2 flex-1 dark:bg-slate-950 ease-in-out">
      <View className="flex-row items-center space-x-2">
        <Animated.View
          className="p-1 rounded-full bg-neutral-300"
          entering={ZoomIn.duration(700)}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Animated.Image
              source={{
                uri:
                  currentUser.profilePic ||
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EACwQAQACAQIEBQMEAwAAAAAAAAABAgMEEQUSITETUVJhcTJBQiJi0eE0crH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EABwRAQEBAAIDAQAAAAAAAAAAAAABAhExAyFBEv/aAAwDAQACEQMRAD8A/RAHpZAAAAAAAHedogA3WOl4VfJHNntyR6Y7/wBLLDoNNi6xiiZ87dZRdyKmWepS9/opa3xG6cmLJj28Slq79uaNmp2iI2iNo9lHxXT54y2zWmb4/tMfj7OZ3zS5V4DRIAAAAAAAAAAAAAAAAuuEaOKY4z3j9dvp9oUs9mqwRthxxHphnu+lZfYDJYiY36THRICh4povAt4uKNsdp6x6ZcDRcTjfQ5fhnYbYvMRrsAWkAAAAAAAAAAAAAAns1eP6K/DLVpbJaK0rNrT2iGpp9EfDLyKy+gGawAHLxH/Bzf6s5DScQrNtFlisTMzHSGbhr4+kaAGiQAAAAAAAAAAAAAHTw+3LrcM/u2aOOzKVtNLVvXvWd4ajT5YzYKZIjbmjfbyZeSe+V5egDNQACLdKyykzvMz59Wg4nqPA0tunW36YZ6Gvjn1GgBokAAAAAAAAAAAAAAld8FzRbTTi3/VSe3tKkdPD7WrrcXJO29tp94Tqcx2dtGkGDQBFu0gpeN5ufNTFWd4pG8/Mq2E3tN8lrWneZmZlD0ZnEZ0AdcAAAAAAAAAAAAAAJd/CdLkvmpn6clJnvPs4Yra88tYmZn7Q0mgw+BpaUnvtvPzKN3iKzHQAxWItG8bJAZbUYb6fNOPJEb994ea241p7WmmelZttHLO0KmG+bzGd7AFOAAAAAAAAAAA+8OLJnvyYqzM/8W+l4TSm1s9ue3pjt/abqR2RVYcGXPO2Kk29/sstPwiOltReZn01/laVpWtYrWsREfaIfTO7tV+Y8sODFhjbFjrX4h6ghQAAACJc2o0ODPvz02tP5V6S6g6FHn4Rlp1w2i9fKekuC9LY7ct6zW0faYat55cGLNXly0i0e65u/U3LLC11XCJrvbTW3/Zb+VZatqWmt6zW0d4lpNS9Js4fICnAAAABMdZ2hA4NLo9NXTYYpWI3/KfOXQDztQAAAAAAAAAAABW8Y00Xw+NXpanf3gHc9uVSAPQzAAf/2Q==",
              }}
              style={{ height: wp("15%"), width: wp("15%") }}
              className="rounded-full"
              entering={ZoomIn.delay(200).duration(700)}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInLeft.delay(1000).duration(700)}>
          <Text className="text-neutral-500" style={{ fontSize: wp(4.5) }}>
            Welcome,
          </Text>
          <Text className="text-neutral-400" style={{ fontSize: wp(3.5) }}>
            {currentUser.name}
          </Text>
        </Animated.View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 5 }}
        className="mt-3 space-y-3"
      >
        {sidebar.map((item, i) => (
          <Animated.View
            key={i}
            className="space-y-2 pb-3 border-b border-neutral-200"
            entering={FadeInRight.duration(700).delay(200 * i)}
          >
            <Text className="text-neutral-500 font-thin">{item.title}</Text>
            <View>
              {item.items.map((ite, i) => (
                <TouchableOpacity
                  key={i}
                  className="flex-row items-center space-x-1 p-2"
                >
                  <Image
                    source={ite.img}
                    style={{ width: wp(8), height: wp(8) }}
                  />
                  <Text className="dark:text-neutral-200">{ite.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}
        <View className="px-2 flex-row items-center justify-between">
          <TouchableOpacity onPress={toggleColorScheme}>
            {colorScheme === "dark" ? (
              <SunIcon size={wp(9)} color={"#FFD700"} />
            ) : (
              <MoonIcon size={wp(9)} color={"#800080"} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 bg-red-600 rounded-xl"
            onPress={handleLogout}
          >
            <Text className=" text-white font-bold p-1">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
