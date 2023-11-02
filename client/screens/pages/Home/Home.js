import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Stories from "../../components/Stories/Stories";
import Share from "../../components/share/Share";
import Posts from "../../components/Posts/Posts";
import Animated, { FadeInLeft, ZoomIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { BellIcon } from "react-native-heroicons/solid";
import { useColorScheme } from "nativewind";
import { AuthContext } from "../../../context/AuthContex";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const { currentUser } = useContext(AuthContext);
  return (
    <Animated.View className="flex-1 bg-slate-100 space-y-2 dark:bg-slate-800">
      <StatusBar style="auto" />
      <SafeAreaView className="flex-row items-center justify-between p-2">
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
            <Text
              className="text-neutral-400 capitalize"
              style={{ fontSize: wp(3.5) }}
            >
              {currentUser.name}
            </Text>
          </Animated.View>
        </View>
        <View className="flex-row space-x-2 items-center">
          <TouchableOpacity>
            <MagnifyingGlassIcon
              strokeWidth={2}
              color={colorScheme === "light" ? "black" : "white"}
              size={hp(4)}
            />
          </TouchableOpacity>
          <View className="relative">
            <TouchableOpacity>
              <BellIcon strokeWidth={2} color={"#FFD700"} size={hp(4)} />
            </TouchableOpacity>
            <Animated.Text
              className="absolute p-1 bg-red-600 rounded-full text-white text-center items-center justify-center flex-row"
              style={{
                fontSize: 10,
                width: wp(5.3),
                height: wp(5.3),
                top: -8,
                left: 10,
              }}
              entering={ZoomIn.duration(1000).springify()}
            >
              2
            </Animated.Text>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Stories />
        <Share />
        <Posts />
      </ScrollView>
    </Animated.View>
  );
}
