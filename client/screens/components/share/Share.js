import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";

export default function Share() {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const [desc, setdesc] = useState("");

  const mutation = useMutation({
    mutationFn: () => {
      return makeRequest.post(`/posts/${currentUser._id}`, { desc });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", currentUser._id] });
    },
  });

  const handleShare = () => {
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
    <View className="items-center w-full">
      <View
        className="bg-white mt-4 px-2 rounded-lg dark:bg-slate-900"
        style={{ height: hp(20), width: wp("90%") }}
      >
        <View className="flex-row p-2 items-center space-x-2 border-b border-b-neutral-100">
          <Image
            source={{
              uri:
                currentUser.profilePic ||
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EACwQAQACAQIEBQMEAwAAAAAAAAABAgMEEQUSITETUVJhcTJBQiJi0eE0crH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EABwRAQEBAAIDAQAAAAAAAAAAAAABAhExAyFBEv/aAAwDAQACEQMRAD8A/RAHpZAAAAAAAHedogA3WOl4VfJHNntyR6Y7/wBLLDoNNi6xiiZ87dZRdyKmWepS9/opa3xG6cmLJj28Slq79uaNmp2iI2iNo9lHxXT54y2zWmb4/tMfj7OZ3zS5V4DRIAAAAAAAAAAAAAAAAuuEaOKY4z3j9dvp9oUs9mqwRthxxHphnu+lZfYDJYiY36THRICh4povAt4uKNsdp6x6ZcDRcTjfQ5fhnYbYvMRrsAWkAAAAAAAAAAAAAAns1eP6K/DLVpbJaK0rNrT2iGpp9EfDLyKy+gGawAHLxH/Bzf6s5DScQrNtFlisTMzHSGbhr4+kaAGiQAAAAAAAAAAAAAHTw+3LrcM/u2aOOzKVtNLVvXvWd4ajT5YzYKZIjbmjfbyZeSe+V5egDNQACLdKyykzvMz59Wg4nqPA0tunW36YZ6Gvjn1GgBokAAAAAAAAAAAAAAld8FzRbTTi3/VSe3tKkdPD7WrrcXJO29tp94Tqcx2dtGkGDQBFu0gpeN5ufNTFWd4pG8/Mq2E3tN8lrWneZmZlD0ZnEZ0AdcAAAAAAAAAAAAAAJd/CdLkvmpn6clJnvPs4Yra88tYmZn7Q0mgw+BpaUnvtvPzKN3iKzHQAxWItG8bJAZbUYb6fNOPJEb994ea241p7WmmelZttHLO0KmG+bzGd7AFOAAAAAAAAAAA+8OLJnvyYqzM/8W+l4TSm1s9ue3pjt/abqR2RVYcGXPO2Kk29/sstPwiOltReZn01/laVpWtYrWsREfaIfTO7tV+Y8sODFhjbFjrX4h6ghQAAACJc2o0ODPvz02tP5V6S6g6FHn4Rlp1w2i9fKekuC9LY7ct6zW0faYat55cGLNXly0i0e65u/U3LLC11XCJrvbTW3/Zb+VZatqWmt6zW0d4lpNS9Js4fICnAAAABMdZ2hA4NLo9NXTYYpWI3/KfOXQDztQAAAAAAAAAAABW8Y00Xw+NXpanf3gHc9uVSAPQzAAf/2Q==",
            }}
            style={{ height: hp(5), width: hp(5) }}
            className="rounded-full"
          />
          <TextInput
            placeholder="What's On Your Mind?"
            value={desc}
            onChangeText={(text) => setdesc(text)}
            placeholderTextColor={"grey"}
            className="px-2 dark:text-neutral-200"
            multiline={true}
            style={{ width: wp(70), height: hp(10) }}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <View className="p-2 flex-row items-center space-x-3">
            <TouchableOpacity>
              <Image
                source={require("../../../assets/icon/img.png")}
                style={{ width: wp(8), height: wp(8) }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../../assets/icon/place.png")}
                style={{ width: wp(8), height: wp(8) }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../../assets/icon/tag.png")}
                style={{ width: wp(8), height: wp(8) }}
              />
            </TouchableOpacity>
          </View>
          <Button
            title="Share"
            disabled={!desc}
            accessibilityLabel="Learn more about this purple button"
            onPress={handleShare}
          />
        </View>
      </View>
    </View>
  );
}
