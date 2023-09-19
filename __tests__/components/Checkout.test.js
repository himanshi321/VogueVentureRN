import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Checkout from "../../src/screens/Checkout/Checkout";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const mockStore = configureStore([thunk]);

const cart = [
  {
    colour: "Black",
    id: 1,
    img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
    name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
    price: 10,
    qty: 2,
  },
  {
    colour: "Stone",
    id: 2,
    img: "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024",
    name: "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
    price: 4,
    qty: 3,
  },
];

const MockedComponent = ({ store }) => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);
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
    cart: [...cart],
    total: 0,
    wishlisted: [],
  },
});

describe("Checkout component", () => {
  test("Checkout page displays products with quantity", async () => {
    const { getByText, getByTestId } = render(
      <MockedComponent store={store} />
    );

    await waitFor(() => {
      for (const item of cart) {
        const productName = getByText(`${item.name}`);
        const productQuantity = getByTestId(`product-qty-${item.qty}`);
        expect(productName).toBeTruthy();
        expect(productQuantity).toBeTruthy();
      }
    });
  });

  test("Total price is calculated correctly", () => {
    let total = store
      .getState()
      .product.cart.reduce(
        (acc, product) => acc + product.price * product.qty,
        0
      );
    let expectedTotalPrice = total.toFixed(2);
    const { getByTestId } = render(<MockedComponent store={store} />);

    const actualTotalPrice = getByTestId(`total-amount`)?.props?.children?.[1];
    expect(actualTotalPrice).toBe(expectedTotalPrice);
  });
});
