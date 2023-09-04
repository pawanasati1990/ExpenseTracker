import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllExpenses from "./screens/AllExpenses";
import { Ionicons } from "@expo/vector-icons";
import ManageExpenses from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import IconButton from "./components/ui/IconButtons";
import ExpensesContextProvider from "./store/expenses_context";
import { GlobalStyles } from "./constants/Styles";

import Login from "./screens/login/Login";
import Signup from "./screens/login/Signup";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContextProvier, { AuthContext } from "./store/auth-context";
import * as SplashScreen from "expo-splash-screen";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpensesOverView() {
  const authCtx = useContext(AuthContext);

  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
            />
            <IconButton
              icon="exit"
              onPress={authCtx.logout}
              size={24}
              color={tintColor}
            />
          </View>
        ),
      })}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size}></Ionicons>
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses", //tab name
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size}></Ionicons>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

//// checking auth
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    //     headerTintColor: "white",
    //     headerRight: ({ tintColor }) => {
    //       return (
    //         <IconButton
    //           icon="exit"
    //           onPress={authCtx.logout}
    //           size={24}
    //           color={tintColor}
    //         />
    //       );
    //     },
    //     contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
    //   }}

    // >
    //    </Stack.Navigator>

    <ExpensesContextProvider>
      {/* <NavigationContainer> */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        }}
      >
        <Stack.Screen
          name="ExpensesOverView"
          component={ExpensesOverView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpenses}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </ExpensesContextProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [tryingLogin, setryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.autheticate(storedToken);
      }
      setryingLogin(false);
    }
    fetchToken();
  }, []);

  if (tryingLogin) {
    SplashScreen.preventAutoHideAsync();
  } else {
    SplashScreen.hideAsync();
    return <Navigation />;
  }
}

////

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvier>
        <Root />
      </AuthContextProvier>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
