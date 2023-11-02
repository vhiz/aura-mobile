import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../../axios";

export default function ProfileDesc({ user }) {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return makeRequest.post(`/conversations/${currentUser._id}`, {
        receiverId: user._id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations", currentUser._id],
      });
    },
  });
  const handelConversation = () => {
    try {
      mutation.mutate();
      navigation.navigate("Conversations");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Animated.View
      className="w-full items-center"
      entering={ZoomIn.duration(700)}
    >
      <View
        className="mt-3 bg-white rounded-xl p-2 space-y-3 dark:bg-slate-900"
        style={{ width: wp("96%") }}
      >
        <View className="w-full items-center mt-16">
          <Text
            className="font-bold text-neutral-500 text-center capitalize"
            style={{ fontSize: wp(5) }}
          >
            {user.name}
          </Text>
        </View>
        <View className="flex-row w-full justify-center space-x-3">
          <TouchableOpacity>
            <Image
              source={require("../../../assets/icon/insta.png")}
              style={{ width: wp(7), height: wp(7) }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/icon/x.png")}
              style={{ width: wp(7), height: wp(7) }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/icon/in.png")}
              style={{ width: wp(7), height: wp(7) }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/icon/pin.png")}
              style={{ width: wp(7), height: wp(7) }}
            />
          </TouchableOpacity>
        </View>
        <View className="w-full items-center">
          <Image
            source={require("../../../assets/icon/email.png")}
            style={{ width: wp(3), height: wp(3) }}
          />
          <Text className="font-thin text-xs text-neutral-400">
            {user.email}
          </Text>
        </View>
        {user.city && (
          <View className="w-full items-center">
            <Image
              source={require("../../../assets/icon/loca.png")}
              style={{ width: wp(3), height: wp(3) }}
            />
            <Text className="font-thin text-xs text-neutral-400">
              {user.city}
            </Text>
          </View>
        )}
        <View className="flex-row justify-center">
          {user._id === currentUser._id ? (
            <Button
              title="Update"
              onPress={() => navigation.navigate("Update")}
            />
          ) : (
            <View className="flex-row space-x-6 items-center ">
              <Button title="Follow" />
              <TouchableOpacity onPress={handelConversation}>
                <Image
                  source={require("../../../assets/icon/email.png")}
                  style={{ width: wp(12), height: wp(12) }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
}
