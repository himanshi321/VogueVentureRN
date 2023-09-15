import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Product } from "../../store/StoreType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { removeFromCart } from "../../store/slice/ProductsSlice";
import { useDispatch } from "react-redux";

export default function CheckoutCard({ product }: Props) {
  const dispatch = useDispatch();
  return (
    <View style={styles.card}>
      <View style={styles.deleteIcon}>
        <Ionicons
          name="md-trash-outline"
          size={20}
          color="#36454F"
          onPress={() => dispatch(removeFromCart(product.id))}
        />
      </View>
      <View>
        <ImageBackground source={{ uri: product.img }} style={styles.image} />
      </View>
      <View>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.title}>Available Color : {product.colour}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderStyle: "solid",
    borderColor: "#ddd",
    borderWidth: 1,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 50,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 12,
    color: "#9f9d9d",
    marginTop: 12,
    paddingLeft: 5,
    width: "85%",
  },
  price: {
    fontSize: 14,
    color: "#36454F",
    marginTop: 10,
    paddingLeft: 5,
  },
  deleteIcon: {
    position: "absolute",
    right: 12,
    top: 20,
    zIndex: 1,
  },
});

interface Props {
  product: Product;
}
