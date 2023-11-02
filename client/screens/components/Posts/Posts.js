import { View, Text } from "react-native";
import React, { useContext } from "react";
import Post from "../Post/Post";
import { AuthContext } from "../../../context/AuthContex";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Posts({ userId }) {
  const { currentUser } = useContext(AuthContext);
  const { error, isLoading, data } = useQuery(
    ["posts", currentUser._id, userId],
    async () => {
      const res = await makeRequest.get(
        userId ? `/posts/${userId}` : `/posts/find/${currentUser._id}`
      );
      return res.data;
    }
  );

  return (
    <View className="mt-5 items-center space-6">
      {isLoading ? (
        <Progress.CircleSnail
          size={wp(35)}
          color={["red", "green", "blue"]}
          thickness={5}
        />
      ) : (
        data
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((item, i) => (
            <Post key={i} index={i} post={item} userId={userId} />
          ))
      )}
    </View>
  );
}
