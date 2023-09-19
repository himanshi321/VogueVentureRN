import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "../../src/screens/Home/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { addToCart, removeFromCart } from "../../src/store/slice/ProductsSlice";

const mockStore = configureStore([thunk]);
const Stack = createNativeStackNavigator();

// Create a mock store with initial state
const store = mockStore({
  product: {
    data: [
      {
        colour: "Black",
        id: 1,
        img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
        name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
        price: 10,
        qty: 1,
      },
      {
        colour: "Stone",
        id: 2,
        img: "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024",
        name: "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
        price: 4,
        qty: 1,
      },
      {
        colour: "Black",
        id: 3,
        img: "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024",
        name: "Black Frill Tie Shoulder Bodycon Dress",
        price: 7.99,
        qty: 1,
      },
      {
        colour: "Red",
        id: 5,
        img: "https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024",
        name: "Red Pin Stripe Belt T Shirt Dress",
        price: 17,
        qty: 1,
      },
    ],
    isLoading: false,
    hasError: false,
    cart: [
      {
        colour: "Red",
        id: 5,
        img: "https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024",
        name: "Red Pin Stripe Belt T Shirt Dress",
        price: 17,
        qty: 1,
      },
    ],
    total: 0,
    wishlisted: [],
  },
});

const MockedHome = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} initialParams={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

describe("Home component", () => {
  test("renders Welcome message", () => {
    const { getByText } = render(<MockedHome />);
    expect(getByText("Welcome to Vogue Venture")).toBeTruthy();
  });

  test("Renders products correctly", () => {
    const { getByText } = render(<MockedHome />);
    const productName = getByText(
      "Black Sheet Strappy Textured Glitter Bodycon Dress"
    );
    const productPrice = getByText("$10");
    expect(productName).toBeTruthy();
    expect(productPrice).toBeTruthy();
  });

  test("Add to Cart button adds product to the cart", async () => {
    // Find the "Add to Cart" button for a product
    const { getByTestId } = render(<MockedHome />);
    const product = {
      colour: "Black",
      id: 1,
      img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
      name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
      price: 10,
      qty: 1,
    };

    // Find the "Add to Cart" button for the specified product
    const addToCartButton = getByTestId(`add-to-cart-${product.id}`);

    // Simulate clicking the "Add to Cart" button
    fireEvent.press(addToCartButton);

    // Check if the addToCart action was dispatched with the correct product
    const actions = store.getActions();
    expect(actions).toContainEqual(addToCart(product));
  });

  test("Remove from Cart button removes product from the cart", () => {
    const productId = 5;
    const { getByTestId } = render(<MockedHome />);

    // Find the "Remove from Cart" button within the rendered component
    const removeFromCartButton = getByTestId(`remove-from-cart-${productId}`);

    fireEvent.press(removeFromCartButton);

    // Check if the removeFromCart action was dispatched with the correct product ID
    const actions = store.getActions();
    expect(actions).toContainEqual(removeFromCart(productId));
  });
});
