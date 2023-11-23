import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/screens/HomeScreen";
import ChangeThemeScreen from "./components/screens/ChangeThemeScreen";
import ShowAllQuotes from "./components/screens/ShowAllQuotes";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ChangeTheme"
          options={{
            presentation: "formSheet",
          }}
          component={ChangeThemeScreen}
        />
        <Stack.Screen name="ShowAllQuotes" options={{
          presentation : "containedModal"
        }}
        component={ShowAllQuotes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
