import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import Details from "./screens/Details";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();
const stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{ headerShown: false }}
      //   initialRouteName="Home"
    >
      {/* <stack.Screen name="Welcome" component={Welcome} /> */}
      <stack.Screen
        name="Tabs"
        component={TabNavigator}
        screenOptions={{ headerShown: false }}
      />
      {/* <stack.Screen name="Home" component={Home} /> */}
      <stack.Screen name="Details" component={Details} />
    </stack.Navigator>
  );
};

const App = () => {
  const [fontsLoaded, error] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer theme={theme}>
      {/* <TabNavigator /> */}
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
