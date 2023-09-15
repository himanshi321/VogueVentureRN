import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useMemo } from "react";
import { Product, StoreType } from "../../store/StoreType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWislist,
  removeFromCart,
  removeFromWishlist,
} from "../../store/slice/ProductsSlice";

const ProductCard = ({ product }: Props) => {
  const wishlisted = useSelector(
    (state: StoreType) => state.product.wishlisted
  );
  const cart = useSelector((state: StoreType) => state.product.cart);
  const dispatch = useDispatch();

  const isProductWishlisted = () => {
    const index = wishlisted.findIndex((item) => item.id === product.id);
    return index !== -1;
  };

  const isProductInCart = () => {
    const index = cart.findIndex((item) => item.id === product.id);
    return index !== -1;
  };

  const isWishlisted = useMemo(() => isProductWishlisted(), [wishlisted]);

  const isInCart = useMemo(() => isProductInCart(), [cart]);

  return (
    <View style={styles.card}>
      <View style={styles.wishlistIcon}>
        {wishlisted?.length > 0 && isWishlisted ? (
          <Ionicons
            name="md-heart"
            size={20}
            color="#36454F"
            onPress={() => dispatch(removeFromWishlist(product.id))}
          />
        ) : (
          <Ionicons
            name="md-heart-outline"
            size={20}
            color="#36454F"
            onPress={() => dispatch(addToWislist(product))}
          />
        )}
      </View>
      <ImageBackground source={{ uri: product.img }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      {isInCart ? (
        <Pressable
          style={styles.button}
          onPress={() => dispatch(removeFromCart(product.id))}
        >
          <Text style={styles.buttonText}>Remove from cart</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.button}
          onPress={() => dispatch(addToCart(product))}
        >
          <Text style={styles.buttonText}>Add to cart</Text>
        </Pressable>
      )}
    </View>
  );
};

interface Props {
  product: Product;
}

const styles = StyleSheet.create({
  card: {
    width: "49.5%",
    height: 350,
    marginBottom: 10,
    position: "relative",
    borderStyle: "solid",
    borderColor: "#eee",
    borderWidth: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    color: "#9f9d9d",
    marginTop: 12,
    paddingLeft: 5,
  },
  price: {
    fontSize: 12,
    color: "#36454F",
    marginTop: 5,
    paddingLeft: 5,
  },
  wishlistIcon: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 1,
  },
  button: {
    backgroundColor: "#e49a7c",
    display: "flex",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});

export default ProductCard;
