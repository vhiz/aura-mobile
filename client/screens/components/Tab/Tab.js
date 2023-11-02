import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import React, { useEffect, useState } from "react";

import { EnvelopeIcon, HomeIcon } from "react-native-heroicons/solid";
import { UserCircleIcon, UsersIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useColorScheme } from "nativewind";

export default function TabBar({ state, descriptors, navigation }) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-row items-center justify-between p-3 h-10 bg-slate-100 dark:bg-slate-800">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={label === "Welcome" && { display: "none" }}
            key={index}
          >
            {label === "Home" && (
              <HomeIcon
                size={wp(8)}
                strokeWidth={2}
                color={
                  colorScheme === "dark"
                    ? isFocused
                      ? "#64B5F6"
                      : "white"
                    : isFocused
                    ? "#64B5F6"
                    : "black"
                }
              />
            )}
            {label === "Profile" && (
              <UserCircleIcon
                size={wp(8)}
                strokeWidth={2}
                color={
                  colorScheme === "dark"
                    ? isFocused
                      ? "#64B5F6"
                      : "white"
                    : isFocused
                    ? "#64B5F6"
                    : "black"
                }
              />
            )}
            {label === "Conversations" && (
              <EnvelopeIcon
                size={wp(8)}
                strokeWidth={2}
                color={
                  colorScheme === "dark"
                    ? isFocused
                      ? "#64B5F6"
                      : "white"
                    : isFocused
                    ? "#64B5F6"
                    : "black"
                }
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
