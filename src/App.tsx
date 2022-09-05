import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppDrawer from "./navigations/AppDrawer";
import AuthNavigationStack from "./navigations/authStack/AuthNavigationStack";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import WelcomeStack from "./navigations/Welcome/WelcomeStack";
import * as secureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { getStarted, getUser } from "./store/features/userSlice";
import {
  Actionsheet,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";
import {
  decreaseQuantity,
  dismissCart,
  getCart,
  increaseQuantity,
  removeFromCart,
} from "./store/features/cartSlice";
import { Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Cart from "./components/Cart";
import { getUserFromSecureStore } from "./utils/Helpers";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const auth = useAppSelector(getUser);

  useEffect(() => {
    async function prepare() {
      try {
        // const user = await getUserFromSecureStore("USERTOKEN");

        // if (user?.userToken) {
        //   //verify vlidity of token from backend
        //   // reset user in securestore
        // }
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
        console.log("no user token found");
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        console.log("app is ready");
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        {auth.user.userToken || !auth.showGetStarted ? (
          <>
            <AppDrawer />
            <Cart />
          </>
        ) : (
          <WelcomeStack />
        )}
      </NavigationContainer>
    </View>
  );
};

export default Index;
