import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { PaperAirplaneIcon } from "react-native-heroicons/outline";
import Comment from "../comment/Comment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../../axios";
import * as Progress from "react-native-progress";
import { AuthContext } from "../../../context/AuthContex";

export default function Comments({
  colorScheme,
  fullPost,
  postId,
  setCommentsCount,
}) {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const [desc, setdesc] = useState("");
  const { error, isLoading, data } = useQuery(
    ["comments", postId],
    async () => {
      const res = await makeRequest.get(`/comments?postId=${postId}`);
      setCommentsCount(res.data.length);
      return res.data;
    }
  );

  const mutation = useMutation({
    mutationFn: () => {
      return makeRequest.post(`/comments/${currentUser._id}`, { desc, postId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleComment = () => {
    if (!desc) {
      return;
    }
    try {
      mutation.mutate();
      setdesc("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Animated.View entering={FadeIn.duration(800)} className="mt-4 px-1">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity>
          <Image
            source={{
              uri:
                currentUser.profilePic ||
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EACwQAQACAQIEBQMEAwAAAAAAAAABAgMEEQUSITETUVJhcTJBQiJi0eE0crH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EABwRAQEBAAIDAQAAAAAAAAAAAAABAhExAyFBEv/aAAwDAQACEQMRAD8A/RAHpZAAAAAAAHedogA3WOl4VfJHNntyR6Y7/wBLLDoNNi6xiiZ87dZRdyKmWepS9/opa3xG6cmLJj28Slq79uaNmp2iI2iNo9lHxXT54y2zWmb4/tMfj7OZ3zS5V4DRIAAAAAAAAAAAAAAAAuuEaOKY4z3j9dvp9oUs9mqwRthxxHphnu+lZfYDJYiY36THRICh4povAt4uKNsdp6x6ZcDRcTjfQ5fhnYbYvMRrsAWkAAAAAAAAAAAAAAns1eP6K/DLVpbJaK0rNrT2iGpp9EfDLyKy+gGawAHLxH/Bzf6s5DScQrNtFlisTMzHSGbhr4+kaAGiQAAAAAAAAAAAAAHTw+3LrcM/u2aOOzKVtNLVvXvWd4ajT5YzYKZIjbmjfbyZeSe+V5egDNQACLdKyykzvMz59Wg4nqPA0tunW36YZ6Gvjn1GgBokAAAAAAAAAAAAAAld8FzRbTTi3/VSe3tKkdPD7WrrcXJO29tp94Tqcx2dtGkGDQBFu0gpeN5ufNTFWd4pG8/Mq2E3tN8lrWneZmZlD0ZnEZ0AdcAAAAAAAAAAAAAAJd/CdLkvmpn6clJnvPs4Yra88tYmZn7Q0mgw+BpaUnvtvPzKN3iKzHQAxWItG8bJAZbUYb6fNOPJEb994ea241p7WmmelZttHLO0KmG+bzGd7AFOAAAAAAAAAAA+8OLJnvyYqzM/8W+l4TSm1s9ue3pjt/abqR2RVYcGXPO2Kk29/sstPwiOltReZn01/laVpWtYrWsREfaIfTO7tV+Y8sODFhjbFjrX4h6ghQAAACJc2o0ODPvz02tP5V6S6g6FHn4Rlp1w2i9fKekuC9LY7ct6zW0faYat55cGLNXly0i0e65u/U3LLC11XCJrvbTW3/Zb+VZatqWmt6zW0d4lpNS9Js4fICnAAAABMdZ2hA4NLo9NXTYYpWI3/KfOXQDztQAAAAAAAAAAABW8Y00Xw+NXpanf3gHc9uVSAPQzAAf/2Q==",
            }}
            style={{ height: wp(10), width: wp(10) }}
            className="rounded-full"
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Share Your Thoughts...."
          value={desc}
          className="border-b border-gray-100 dark:text-neutral-200"
          style={{ width: wp("65%") }}
          placeholderTextColor={colorScheme === "light" ? "black" : "grey"}
          onChangeText={(text) => setdesc(text)}
        />
        <TouchableOpacity disabled={!desc} onPress={handleComment}>
          <PaperAirplaneIcon size={wp(5)} strokeWidth={2} color={"grey"} />
        </TouchableOpacity>
      </View>
      <View className="mt-6 items-center">
        {isLoading ? (
          <Progress.CircleSnail
            size={wp(15)}
            color={["red", "green", "blue"]}
            thickness={2}
          />
        ) : !fullPost ? (
          data
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .slice(0, 5)
            .map((item, i) => <Comment key={i} index={i} item={item} />)
        ) : (
          data
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((item, i) => <Comment key={i} index={i} item={item} />)
        )}

        {!fullPost && (
          <TouchableOpacity className="text-neutral-300 text-sm self-end">
            <Text className="text-neutral-300 text-sm self-end">See more</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}
