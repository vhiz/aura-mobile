import { createContext, useEffect, useRef, useState } from "react";
import { makeRequest } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "../notification";

import * as Notifications from "expo-notifications";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [currentUser]);


  const login = async (inputs) => {
    const res = await makeRequest.post(
      "/auth/login",
      { ...inputs, expoPushToken },
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
    // Store the user data in AsyncStorage after login
    storeUserData(res.data);
  };

  const register = async (inputs) => {
    const res = await makeRequest.post("/auth/register", inputs, {
      withCredentials: true,
    });
  };

  const logout = async () => {
    setCurrentUser(null);
    // Remove user data from AsyncStorage after logout
    removeUserData();
  };

  // Function to store user data in AsyncStorage
  const storeUserData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  // Function to remove user data from AsyncStorage
  const removeUserData = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Retrieve user data from AsyncStorage when the component mounts
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue != null) {
          setCurrentUser(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
