import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import MessageContainer from "../MessageContainer/MessageContainer";
import { PaperAirplaneIcon } from "react-native-heroicons/outline";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthContext } from "../../../context/AuthContex";
import { makeRequest } from "../../../axios";
import * as Progress from "react-native-progress";

export default function Messages() {
  const { params: conversation } = useRoute();
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);

  const receiverId = conversation.members.filter(
    (id) => id !== currentUser._id
  );

  const { error, isLoading, data } = useQuery(
    ["messageUser", conversation],
    async () => {
      const res = await makeRequest.get(`/users/find/${receiverId[0]}`);
      return res.data;
    }
  );

  const { isLoading: loading, data: messages } = useQuery(
    ["messages", conversation],
    async () => {
      const res = await makeRequest.get(`/messages/${conversation._id}`);
      return res.data;
    }
  );
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (text) => {
      return makeRequest.post(`/messages/${currentUser._id}`, {
        conversationId: conversation._id,
        text,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversation] });
    },
  });

  const handleSend = () => {
    if (!text) {
      return;
    }
    try {
      mutation.mutate(text);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="bg-slate-100 flex-1 dark:bg-slate-800">
      <StatusBar style="auto" />
      <SafeAreaView className="flex-row justify-between items-center dark:bg-slate-900">
        <View className="px-3 flex-row space-x-2 items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={wp(6)} color={"grey"} strokeWidth={3} />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center space-x-2"
            onPress={() => navigation.navigate("Profile")}
          >
            <View className="p-1 bg-slate-300 rounded-full relative">
              <Animated.Image
                source={{
                  uri:
                    data.profilePic ||
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EACwQAQACAQIEBQMEAwAAAAAAAAABAgMEEQUSITETUVJhcTJBQiJi0eE0crH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EABwRAQEBAAIDAQAAAAAAAAAAAAABAhExAyFBEv/aAAwDAQACEQMRAD8A/RAHpZAAAAAAAHedogA3WOl4VfJHNntyR6Y7/wBLLDoNNi6xiiZ87dZRdyKmWepS9/opa3xG6cmLJj28Slq79uaNmp2iI2iNo9lHxXT54y2zWmb4/tMfj7OZ3zS5V4DRIAAAAAAAAAAAAAAAAuuEaOKY4z3j9dvp9oUs9mqwRthxxHphnu+lZfYDJYiY36THRICh4povAt4uKNsdp6x6ZcDRcTjfQ5fhnYbYvMRrsAWkAAAAAAAAAAAAAAns1eP6K/DLVpbJaK0rNrT2iGpp9EfDLyKy+gGawAHLxH/Bzf6s5DScQrNtFlisTMzHSGbhr4+kaAGiQAAAAAAAAAAAAAHTw+3LrcM/u2aOOzKVtNLVvXvWd4ajT5YzYKZIjbmjfbyZeSe+V5egDNQACLdKyykzvMz59Wg4nqPA0tunW36YZ6Gvjn1GgBokAAAAAAAAAAAAAAld8FzRbTTi3/VSe3tKkdPD7WrrcXJO29tp94Tqcx2dtGkGDQBFu0gpeN5ufNTFWd4pG8/Mq2E3tN8lrWneZmZlD0ZnEZ0AdcAAAAAAAAAAAAAAJd/CdLkvmpn6clJnvPs4Yra88tYmZn7Q0mgw+BpaUnvtvPzKN3iKzHQAxWItG8bJAZbUYb6fNOPJEb994ea241p7WmmelZttHLO0KmG+bzGd7AFOAAAAAAAAAAA+8OLJnvyYqzM/8W+l4TSm1s9ue3pjt/abqR2RVYcGXPO2Kk29/sstPwiOltReZn01/laVpWtYrWsREfaIfTO7tV+Y8sODFhjbFjrX4h6ghQAAACJc2o0ODPvz02tP5V6S6g6FHn4Rlp1w2i9fKekuC9LY7ct6zW0faYat55cGLNXly0i0e65u/U3LLC11XCJrvbTW3/Zb+VZatqWmt6zW0d4lpNS9Js4fICnAAAABMdZ2hA4NLo9NXTYYpWI3/KfOXQDztQAAAAAAAAAAABW8Y00Xw+NXpanf3gHc9uVSAPQzAAf/2Q==",
                }}
                style={{ width: wp(15), height: wp(15) }}
                className="rounded-full"
                entering={ZoomIn.duration(800)}
                exiting={ZoomOut.duration(800)}
              />
              {conversation.online && (
                <View
                  className="absolute h-4 w-4 rounded-full bg-lime-300"
                  style={{ top: 5, right: -0 }}
                />
              )}
            </View>
            <View>
              <Text className="text-neutral-500 font-bold">
                {isLoading ? "..." : data.name}
              </Text>
              <Text className="text-neutral-300 text-xs font-light">
                18 min ago
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <View className="items-center h-full">
          <Progress.CircleSnail
            size={wp(40)}
            color={["red", "green", "blue"]}
            thickness={3}
          />
        </View>
      ) : (
        <MessageContainer
          messages={messages}
          user={data}
          conversation={conversation}
        />
      )}
      <View className="flex-row items-center fixed bottom-0 justify-center p-2">
        <TextInput
          placeholder="Write Your Message Here...."
          onChangeText={(text) => setText(text)}
          className=" rounded-xl p-2 bg-blue-100 dark:bg-slate-700 dark:text-white"
          multiline={true}
          value={text}
          style={{ width: wp("85%"), height: hp(20) }}
          placeholderTextColor={"grey"}
        />
        <TouchableOpacity disabled={!text} onPress={handleSend}>
          <PaperAirplaneIcon size={wp(8)} color={"grey"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
