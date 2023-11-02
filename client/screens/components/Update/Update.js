import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowUpTrayIcon } from "react-native-heroicons/solid";
import { useColorScheme } from "nativewind";

export default function Update() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 10 }}
      className="flex-1 bg-slate-100 px-2 dark:bg-slate-800"
    >
      <SafeAreaView>
        <TouchableOpacity
          className="self-end"
          onPress={() => navigation.goBack()}
        >
          <XMarkIcon size={wp(8)} strokeWidth={2} color={"grey"} />
        </TouchableOpacity>
      </SafeAreaView>
      <View className="mt-10 space-y-4">
        <Text className="text-3xl font-bold text-neutral-400">
          Update Your Profile
        </Text>
        <View className="flex-row space-x-10">
          <View className="space-y-3 relative">
            <Text className="text-neutral-400">Cover Picture</Text>
            <Image
              source={require("../../../assets/bg1.jpg")}
              style={{ width: wp(30), height: wp(30) }}
              className="rounded-md"
            />
            <TouchableOpacity className="absolute top-16 left-10">
              <ArrowUpTrayIcon size={wp(7)} color={"white"} strokeWidth={7} />
            </TouchableOpacity>
          </View>
          <View className="space-y-3 relative">
            <Text className="text-neutral-400">Profile Picture</Text>
            <Image
              source={require("../../../assets/bg2.jpg")}
              style={{ width: wp(30), height: wp(30) }}
              className="rounded-md"
            />
            <TouchableOpacity className="absolute top-16 left-10">
              <ArrowUpTrayIcon size={wp(7)} color={"white"} strokeWidth={7} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="space-y-7 mt-3">
          <View className="space-y-3">
            <Text className="text-neutral-500 text-lg">Email</Text>
            <TextInput
              placeholderTextColor={colorScheme === "light" ? "black" : "grey"}
              className="p-2 border-b text-neutral-600 border-neutral-200 dark:text-neutral-300"
              placeholder="thisisanemail@gmail.com"
            />
          </View>
          <View className="space-y-3">
            <Text className="text-neutral-500 text-lg">Name</Text>
            <TextInput
              placeholderTextColor={colorScheme === "light" ? "black" : "grey"}
              className="p-2 border-b text-neutral-600 border-neutral-200 dark:text-neutral-300"
              placeholder="Your Name"
            />
          </View>
          <View className="space-y-3">
            <Text className="text-neutral-500 text-lg">Country/City</Text>
            <TextInput
              placeholderTextColor={colorScheme === "light" ? "black" : "grey"}
              className="p-2 border-b text-neutral-600 border-neutral-200 dark:text-neutral-300"
              placeholder="Abuja, Nigeria"
            />
          </View>
          <View className="space-y-3">
            <Text className="text-neutral-500 text-lg">Website</Text>
            <TextInput
              placeholderTextColor={colorScheme === "light" ? "black" : "grey"}
              className="p-2 border-b text-neutral-600 border-neutral-200 dark:text-neutral-300"
              placeholder="www.yourwebsite.com"
            />
          </View>
          <View className="space-y-3">
            <Text className="text-neutral-500 text-lg">Phone No</Text>
            <TextInput
              placeholderTextColor={colorScheme === "light" ? "black" : "grey"}
              className="p-2 border-b text-neutral-600 border-neutral-200 dark:text-neutral-300"
              placeholder="+23490...."
              keyboardType="numeric"
            />
          </View>
        </View>
        <View className="mt-10">
          <Button title="Update" />
        </View>
      </View>
    </ScrollView>
  );
}
