import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { friends } from "../../../data";
import { useNavigation } from "@react-navigation/native";
import Animated, { ZoomOut } from "react-native-reanimated";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../../context/AuthContex";
import { useContext } from "react";

export default function FriendsList({ friends }) {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginTop: 10, padding: 4 }}
      className="space-x-2"
    >
      {friends
        // .sort((a, b) => (a.online === b.online ? 0 : a.online ? -1 : 1))
        .map((item, i) => {
          const receiverId = item.members.filter(
            (id) => id !== currentUser._id
          );
          const { error, isLoading, data } = useQuery(
            ["messageUser", item],
            async () => {
              const res = await makeRequest.get(`/users/find/${receiverId[0]}`);
              return res.data;
            }
          );
          return (
            <TouchableOpacity
              key={i}
              className="items-center space-y-1 relative"
              onPress={() => navigation.push("Messages", item)}
            >
              <View className="p-1 bg-slate-300 rounded-full">
                {!isLoading && (
                  <Animated.Image
                    source={{
                      uri:
                        data.profilePic ||
                        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EACwQAQACAQIEBQMEAwAAAAAAAAABAgMEEQUSITETUVJhcTJBQiJi0eE0crH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EABwRAQEBAAIDAQAAAAAAAAAAAAABAhExAyFBEv/aAAwDAQACEQMRAD8A/RAHpZAAAAAAAHedogA3WOl4VfJHNntyR6Y7/wBLLDoNNi6xiiZ87dZRdyKmWepS9/opa3xG6cmLJj28Slq79uaNmp2iI2iNo9lHxXT54y2zWmb4/tMfj7OZ3zS5V4DRIAAAAAAAAAAAAAAAAuuEaOKY4z3j9dvp9oUs9mqwRthxxHphnu+lZfYDJYiY36THRICh4povAt4uKNsdp6x6ZcDRcTjfQ5fhnYbYvMRrsAWkAAAAAAAAAAAAAAns1eP6K/DLVpbJaK0rNrT2iGpp9EfDLyKy+gGawAHLxH/Bzf6s5DScQrNtFlisTMzHSGbhr4+kaAGiQAAAAAAAAAAAAAHTw+3LrcM/u2aOOzKVtNLVvXvWd4ajT5YzYKZIjbmjfbyZeSe+V5egDNQACLdKyykzvMz59Wg4nqPA0tunW36YZ6Gvjn1GgBokAAAAAAAAAAAAAAld8FzRbTTi3/VSe3tKkdPD7WrrcXJO29tp94Tqcx2dtGkGDQBFu0gpeN5ufNTFWd4pG8/Mq2E3tN8lrWneZmZlD0ZnEZ0AdcAAAAAAAAAAAAAAJd/CdLkvmpn6clJnvPs4Yra88tYmZn7Q0mgw+BpaUnvtvPzKN3iKzHQAxWItG8bJAZbUYb6fNOPJEb994ea241p7WmmelZttHLO0KmG+bzGd7AFOAAAAAAAAAAA+8OLJnvyYqzM/8W+l4TSm1s9ue3pjt/abqR2RVYcGXPO2Kk29/sstPwiOltReZn01/laVpWtYrWsREfaIfTO7tV+Y8sODFhjbFjrX4h6ghQAAACJc2o0ODPvz02tP5V6S6g6FHn4Rlp1w2i9fKekuC9LY7ct6zW0faYat55cGLNXly0i0e65u/U3LLC11XCJrvbTW3/Zb+VZatqWmt6zW0d4lpNS9Js4fICnAAAABMdZ2hA4NLo9NXTYYpWI3/KfOXQDztQAAAAAAAAAAABW8Y00Xw+NXpanf3gHc9uVSAPQzAAf/2Q==",
                    }}
                    style={{ height: wp(20), width: wp(20) }}
                    className="rounded-full"
                    exiting={ZoomOut.duration(800)}
                  />
                )}
              </View>
              <Text className="text-neutral-400 text-xs dark:text-neutral-300">
                {data?.name?.length > 10
                  ? data?.name?.slice(0, 10) + "..."
                  : data?.name}
              </Text>
              {item.online && (
                <View
                  className="absolute h-4 w-4 rounded-full bg-lime-300"
                  style={{ top: 5, right: -0 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}
