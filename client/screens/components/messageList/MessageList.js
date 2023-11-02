import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Animated, { FadeInLeft, ZoomOut } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../../context/AuthContex";

export default function MessageList({ conversation, i }) {
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

  return (
    <Animated.View entering={FadeInLeft.delay(200 * i).duration(700)} key={i}>
      {isLoading ? (
        ""
      ) : (
        <TouchableOpacity
          className="flex-row py-3 items-center border-b border-neutral-200 space-x-2 relative"
          onPress={() => navigation.push("Messages", conversation)}
        >
          <View className="p-1 bg-slate-300 rounded-full relative">
            <Animated.Image
              source={{
                uri:
                  data.profilePic ||
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EACwQAQACAQIEBQMEAwAAAAAAAAABAgMEEQUSITETUVJhcTJBQiJi0eE0crH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EABwRAQEBAAIDAQAAAAAAAAAAAAABAhExAyFBEv/aAAwDAQACEQMRAD8A/RAHpZAAAAAAAHedogA3WOl4VfJHNntyR6Y7/wBLLDoNNi6xiiZ87dZRdyKmWepS9/opa3xG6cmLJj28Slq79uaNmp2iI2iNo9lHxXT54y2zWmb4/tMfj7OZ3zS5V4DRIAAAAAAAAAAAAAAAAuuEaOKY4z3j9dvp9oUs9mqwRthxxHphnu+lZfYDJYiY36THRICh4povAt4uKNsdp6x6ZcDRcTjfQ5fhnYbYvMRrsAWkAAAAAAAAAAAAAAns1eP6K/DLVpbJaK0rNrT2iGpp9EfDLyKy+gGawAHLxH/Bzf6s5DScQrNtFlisTMzHSGbhr4+kaAGiQAAAAAAAAAAAAAHTw+3LrcM/u2aOOzKVtNLVvXvWd4ajT5YzYKZIjbmjfbyZeSe+V5egDNQACLdKyykzvMz59Wg4nqPA0tunW36YZ6Gvjn1GgBokAAAAAAAAAAAAAAld8FzRbTTi3/VSe3tKkdPD7WrrcXJO29tp94Tqcx2dtGkGDQBFu0gpeN5ufNTFWd4pG8/Mq2E3tN8lrWneZmZlD0ZnEZ0AdcAAAAAAAAAAAAAAJd/CdLkvmpn6clJnvPs4Yra88tYmZn7Q0mgw+BpaUnvtvPzKN3iKzHQAxWItG8bJAZbUYb6fNOPJEb994ea241p7WmmelZttHLO0KmG+bzGd7AFOAAAAAAAAAAA+8OLJnvyYqzM/8W+l4TSm1s9ue3pjt/abqR2RVYcGXPO2Kk29/sstPwiOltReZn01/laVpWtYrWsREfaIfTO7tV+Y8sODFhjbFjrX4h6ghQAAACJc2o0ODPvz02tP5V6S6g6FHn4Rlp1w2i9fKekuC9LY7ct6zW0faYat55cGLNXly0i0e65u/U3LLC11XCJrvbTW3/Zb+VZatqWmt6zW0d4lpNS9Js4fICnAAAABMdZ2hA4NLo9NXTYYpWI3/KfOXQDztQAAAAAAAAAAABW8Y00Xw+NXpanf3gHc9uVSAPQzAAf/2Q==",
              }}
              style={{ height: wp(15), width: wp(15) }}
              className="rounded-full"
              exiting={ZoomOut.duration(800)}
            />
            {/* {item.online && (
            <View
              className="absolute h-4 w-4 rounded-full bg-lime-300"
              style={{ top: 5, right: -0 }}
            />
          )} */}
          </View>
          <View>
            <Text className="font-semibold text-neutral-400 text-base">
              {data.name}
            </Text>
            <Text
              className=" font-light text-neutral-400"
              style={{ fontSize: 10 }}
            >
              {loading
                ? "..."
                : messages.length < 1
                ? "..."
                : messages[0].text?.length > 100
                ? messages[0].text?.slice(0, 100) + "..."
                : messages[0].text}
            </Text>
          </View>
          {!loading &&
            messages
              .filter((message) => message.sender !== currentUser._id)
              .filter((message) => message.reciverRead === false).length >
              0 && (
              <Animated.Text
                className="absolute p-1 bg-red-600 rounded-full text-white text-center items-center justify-center flex-row"
                style={{
                  fontSize: 10,
                  width: wp(5.3),
                  height: wp(5.3),
                  top: 40,
                  right: 0,
                }}
              >
                {
                  messages.filter((message) => message.reciverRead === false)
                    .length
                }
              </Animated.Text>
            )}
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
