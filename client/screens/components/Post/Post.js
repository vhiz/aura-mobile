import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import {
  Bars3BottomRightIcon,
  ChatBubbleLeftEllipsisIcon,
  CommandLineIcon,
  ShareIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Comments from "../comments/Comments";
import { useContext, useEffect, useRef, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useColorScheme } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest, notify } from "../../../axios";
import * as Progress from "react-native-progress";
import { AuthContext } from "../../../context/AuthContex";
import moment from "moment";
import * as Notifications from "expo-notifications";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Post({ index, fullPost, post, userId }) {
  const [openComment, setopenComment] = useState(false);
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const [commentsCount, setCommentsCount] = useState(0);

  const { error, isLoading, data } = useQuery(["post", post], async () => {
    const res = await makeRequest.get(`/users/find/${post.userId}`);
    return res.data;
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return makeRequest.put(`/likes/${post._id}/like?id=${currentUser._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", currentUser._id, userId],
      });
    },
  });
  const handleLike = async () => {
    try {
      mutation.mutate();
      try {
        await notify({
          title: currentUser.name,
          body: "Liked your Post 💖",
          to: data?.expoPushToken,
        });
      } catch (error) {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Animated.View
      className="bg-white p-2 space-y-4 rounded-2xl mt-3 dark:bg-slate-900"
      style={{ width: wp("90%") }}
      entering={FadeInDown.delay(100 * index)
        .duration(600)
        .springify()}
    >
      <View className="flex-row justify-between">
        {isLoading ? (
          <Progress.CircleSnail
            size={wp(7)}
            color={["red", "green", "blue"]}
            thickness={3}
          />
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.push("Drawer", {
                screen: "HomeTab",
                params: {
                  screen: "Profile",
                  params: {
                    screen: "ProfileModal",
                    params: data,
                  },
                },
              })
            }
          >
            <View className="flex-row space-x-2 items-center">
              <Image
                source={{
                  uri:
                    data.profilePic ||
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EACwQAQACAQIEBQMEAwAAAAAAAAABAgMEEQUSITETUVJhcTJBQiJi0eE0crH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EABwRAQEBAAIDAQAAAAAAAAAAAAABAhExAyFBEv/aAAwDAQACEQMRAD8A/RAHpZAAAAAAAHedogA3WOl4VfJHNntyR6Y7/wBLLDoNNi6xiiZ87dZRdyKmWepS9/opa3xG6cmLJj28Slq79uaNmp2iI2iNo9lHxXT54y2zWmb4/tMfj7OZ3zS5V4DRIAAAAAAAAAAAAAAAAuuEaOKY4z3j9dvp9oUs9mqwRthxxHphnu+lZfYDJYiY36THRICh4povAt4uKNsdp6x6ZcDRcTjfQ5fhnYbYvMRrsAWkAAAAAAAAAAAAAAns1eP6K/DLVpbJaK0rNrT2iGpp9EfDLyKy+gGawAHLxH/Bzf6s5DScQrNtFlisTMzHSGbhr4+kaAGiQAAAAAAAAAAAAAHTw+3LrcM/u2aOOzKVtNLVvXvWd4ajT5YzYKZIjbmjfbyZeSe+V5egDNQACLdKyykzvMz59Wg4nqPA0tunW36YZ6Gvjn1GgBokAAAAAAAAAAAAAAld8FzRbTTi3/VSe3tKkdPD7WrrcXJO29tp94Tqcx2dtGkGDQBFu0gpeN5ufNTFWd4pG8/Mq2E3tN8lrWneZmZlD0ZnEZ0AdcAAAAAAAAAAAAAAJd/CdLkvmpn6clJnvPs4Yra88tYmZn7Q0mgw+BpaUnvtvPzKN3iKzHQAxWItG8bJAZbUYb6fNOPJEb994ea241p7WmmelZttHLO0KmG+bzGd7AFOAAAAAAAAAAA+8OLJnvyYqzM/8W+l4TSm1s9ue3pjt/abqR2RVYcGXPO2Kk29/sstPwiOltReZn01/laVpWtYrWsREfaIfTO7tV+Y8sODFhjbFjrX4h6ghQAAACJc2o0ODPvz02tP5V6S6g6FHn4Rlp1w2i9fKekuC9LY7ct6zW0faYat55cGLNXly0i0e65u/U3LLC11XCJrvbTW3/Zb+VZatqWmt6zW0d4lpNS9Js4fICnAAAABMdZ2hA4NLo9NXTYYpWI3/KfOXQDztQAAAAAAAAAAABW8Y00Xw+NXpanf3gHc9uVSAPQzAAf/2Q==",
                }}
                style={{ width: wp("13%"), height: wp("13%") }}
                className="rounded-full"
              />
              <View>
                <Text className="text-neutral-500 text-sm">{data.name}</Text>
                <Text className="text-neutral-400 text-xs">
                  {moment(post.createdAt).fromNow()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {post.userId === currentUser._id && (
          <TouchableOpacity>
            <Bars3BottomRightIcon
              size={hp(3)}
              color={colorScheme === "light" ? "black" : "grey"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.push("Drawer", {
            screen: "HomeTab",
            params: {
              screen: "Home",
              params: {
                screen: "FullPost",
                params: post,
              },
            },
          })
        }
      >
        <Text className="text-xs dark:text-neutral-200">
          {post.desc.length > 150 ? post.desc.slice(0, 150) + "..." : post.desc}
        </Text>
      </TouchableOpacity>
      <View className="flex-row space-x-3">
        <TouchableOpacity
          onPress={handleLike}
          className=" flex-row items-center space-x-1"
        >
          <HeartIcon
            color={post.likes.includes(currentUser._id) ? "red" : "grey"}
            size={wp(6)}
            strokeWidth={2}
          />
          {post.likes.length > 0 && (
            <Text className="text-neutral-400">{post.likes.length}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setopenComment((prev) => !prev)}
          className="flex-row items-center space-x-1"
        >
          <ChatBubbleLeftEllipsisIcon
            color={colorScheme === "light" ? "black" : "grey"}
            size={wp(6)}
            strokeWidth={2}
          />
          {commentsCount > 0 && (
            <Text className="text-neutral-400">{commentsCount}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <ShareIcon
            color={colorScheme === "light" ? "black" : "grey"}
            size={wp(6)}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
      {(openComment || fullPost) && (
        <Comments
          colorScheme={colorScheme}
          fullPost={fullPost}
          postId={post._id}
          setCommentsCount={setCommentsCount}
        />
      )}
    </Animated.View>
  );
}
