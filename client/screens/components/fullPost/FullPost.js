import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";
import Post from "../Post/Post";
import { StatusBar } from "expo-status-bar";
export default function FullPost() {
  const navigation = useNavigation();
  const { params: post } = useRoute();

  return (
    <View className=" flex-1 bg-slate-100 dark:bg-slate-800">
      <StatusBar style="auto"/>
      <SafeAreaView className="px-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={wp(7.5)} color={"grey"} />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <Post fullPost={true} post={post} />
      </ScrollView>
    </View>
  );
}
