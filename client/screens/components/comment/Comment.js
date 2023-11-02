import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  Bars3BottomRightIcon,
  ChatBubbleLeftEllipsisIcon,
  ShareIcon,
} from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInRight } from "react-native-reanimated";
import { HeartIcon } from "react-native-heroicons/solid";
import { useColorScheme } from "nativewind";
import { makeRequest } from "../../../axios";
import { useQuery } from "react-query";
import moment from "moment";
import * as Progress from "react-native-progress";

export default function Comment({ index, item }) {
  const { colorScheme } = useColorScheme();
  const { error, isLoading, data } = useQuery(
    ["commentUser", item],
    async () => {
      const res = await makeRequest.get(`/users/find/${item.userId}`);
      return res.data;
    }
  );


  return (
    <Animated.View
      entering={FadeInRight.delay(200 * index).duration(500)}
      className={`py-2 w-full ${index !== 5 && "border-b border-neutral-600"}`}
    >
      <View className="flex-row justify-between">
        {isLoading ? (
          <Progress.CircleSnail
            size={wp(6)}
            color={["red", "green", "blue"]}
            thickness={1}
          />
        ) : (
          <TouchableOpacity className="flex-row space-x-2 items-center">
            <Image
              source={{
                uri:
                  data.profilePic ||
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EACwQAQACAQIEBQMEAwAAAAAAAAABAgMEEQUSITETUVJhcTJBQiJi0eE0crH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EABwRAQEBAAIDAQAAAAAAAAAAAAABAhExAyFBEv/aAAwDAQACEQMRAD8A/RAHpZAAAAAAAHedogA3WOl4VfJHNntyR6Y7/wBLLDoNNi6xiiZ87dZRdyKmWepS9/opa3xG6cmLJj28Slq79uaNmp2iI2iNo9lHxXT54y2zWmb4/tMfj7OZ3zS5V4DRIAAAAAAAAAAAAAAAAuuEaOKY4z3j9dvp9oUs9mqwRthxxHphnu+lZfYDJYiY36THRICh4povAt4uKNsdp6x6ZcDRcTjfQ5fhnYbYvMRrsAWkAAAAAAAAAAAAAAns1eP6K/DLVpbJaK0rNrT2iGpp9EfDLyKy+gGawAHLxH/Bzf6s5DScQrNtFlisTMzHSGbhr4+kaAGiQAAAAAAAAAAAAAHTw+3LrcM/u2aOOzKVtNLVvXvWd4ajT5YzYKZIjbmjfbyZeSe+V5egDNQACLdKyykzvMz59Wg4nqPA0tunW36YZ6Gvjn1GgBokAAAAAAAAAAAAAAld8FzRbTTi3/VSe3tKkdPD7WrrcXJO29tp94Tqcx2dtGkGDQBFu0gpeN5ufNTFWd4pG8/Mq2E3tN8lrWneZmZlD0ZnEZ0AdcAAAAAAAAAAAAAAJd/CdLkvmpn6clJnvPs4Yra88tYmZn7Q0mgw+BpaUnvtvPzKN3iKzHQAxWItG8bJAZbUYb6fNOPJEb994ea241p7WmmelZttHLO0KmG+bzGd7AFOAAAAAAAAAAA+8OLJnvyYqzM/8W+l4TSm1s9ue3pjt/abqR2RVYcGXPO2Kk29/sstPwiOltReZn01/laVpWtYrWsREfaIfTO7tV+Y8sODFhjbFjrX4h6ghQAAACJc2o0ODPvz02tP5V6S6g6FHn4Rlp1w2i9fKekuC9LY7ct6zW0faYat55cGLNXly0i0e65u/U3LLC11XCJrvbTW3/Zb+VZatqWmt6zW0d4lpNS9Js4fICnAAAABMdZ2hA4NLo9NXTYYpWI3/KfOXQDztQAAAAAAAAAAABW8Y00Xw+NXpanf3gHc9uVSAPQzAAf/2Q==",
              }}
              style={{ height: wp(7), width: wp(7) }}
              className="rounded-full"
            />
            <View>
              <Text
                style={{ fontSize: wp(2.6) }}
                className="font-thin text-neutral-500"
              >
                {data.name}
              </Text>
              <Text
                style={{ fontSize: wp(2) }}
                className="font-thin text-neutral-500"
              >
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Bars3BottomRightIcon
            size={hp(1.6)}
            color={"black"}
            strokeWidth={1}
          />
        </TouchableOpacity>
      </View>
      <View className="mt-2">
        <Text
          className="text-neutral-600 dark:text-neutral-200"
          style={{ fontSize: wp(2.6) }}
        >
          {item.desc}
        </Text>
      </View>
    </Animated.View>
  );
}
