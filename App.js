import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home/Home";
import Checkout from "./src/screens/Checkout/Checkout";
import Wishlisted from "./src/screens/Wishlisted/Wishlisted";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
           <Stack.Screen 
            name="Wishlisted"
            component={Wishlisted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

{
  /* <View style={styles.container}>
<Stack.Navigator>
  <Stack.Screen name="Home" component={Home} />
  {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */
}
// </Stack.Navigator>
// </View> */}
