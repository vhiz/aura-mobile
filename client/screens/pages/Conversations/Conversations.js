import { View, Text, TextInput, ScrollView } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FriendsList from "../../components/FriendsList/FriendsList";
import ListMessages from "../../components/listMessages/ListMessages";
import { useColorScheme } from "nativewind";
import { AuthContext } from "../../../context/AuthContex";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import { useContext } from "react";
import * as Progress from "react-native-progress";
export default function Conversations() {
  const { colorScheme } = useColorScheme();
  const { currentUser } = useContext(AuthContext);
  const { error, isLoading, data } = useQuery(
    ["conversations", currentUser._id],
    async () => {
      const res = await makeRequest.get(`/conversations/${currentUser._id}`);

      return res.data;
    }
  );
  return (
    <View className="flex-1 bg-slate-100 dark:bg-slate-800">
      <SafeAreaView className="p-2 w-full">
        <View className="flex-row items-center justify-between p-2 bg-neutral-200 rounded-lg dark:bg-slate-900">
          <TextInput
            placeholder="Search For Friends"
            className="p-2 dark:text-neutral-300"
            style={{ width: wp("80%") }}
            placeholderTextColor={colorScheme === "dark" ? "grey" : "black"}
          />
          <MagnifyingGlassIcon size={wp(8)} color={"grey"} />
        </View>
        {isLoading ? (
          <View className="items-center justify-center h-full">
            <Progress.CircleSnail
              size={wp(40)}
              color={["red", "green", "blue"]}
              thickness={3}
            />
          </View>
        ) : (
          <>
            <FriendsList friends={data} />
            <ListMessages friends={data} />
          </>
        )}
      </SafeAreaView>
    </View>
  );
}
