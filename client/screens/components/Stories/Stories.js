import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { PlusIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Stories() {
  return (
    <View className="mb-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5 }}
      >
        <TouchableOpacity
          className="relative mr-2"
          style={{ height: hp(30), width: wp(40) }}
        >
          <Image
            source={require("../../../assets/bg1.jpg")}
            style={{ height: "100%", width: "100%" }}
            className="p-2 rounded-lg ml-3"
          />
          <View className=" bg-blue-400 absolute z-10 bottom-5 left-5 p-1 rounded-full">
            <PlusIcon strokeWidth={2} size={hp(3)} color={"#fff"} />
          </View>
        </TouchableOpacity>
        {Array(10)
          .fill()
          .map((item, i) => (
            <TouchableOpacity key={i}>
              <Image
                source={require("../../../assets/bg2.jpg")}
                style={{ height: hp(30), width: wp(40) }}
                className="p-2 rounded-lg ml-3"
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
