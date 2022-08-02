import { StatusBar } from "expo-status-bar";
//navigatonContainer
import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider, extendTheme } from "native-base";

import { Provider as ReduxProvider } from "react-redux";
import store from "./src/store";
import AppDrawer from "./src/navigations/AppDrawer";
import AuthNavigationStack from "./src/navigations/authStack/AuthNavigationStack";

const user = {
  name: "Peter",
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          {user ? <AppDrawer /> : <AuthNavigationStack />}

          {/* <AuthNavigationStack /> */}
          {/* <AppDrawer /> */}
        </NavigationContainer>
      </NativeBaseProvider>
    </ReduxProvider>
  );
}
