import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { StoreType } from "../../../store/StoreType";
import { useRoute } from "@react-navigation/native";

export default function Header({ navigation, showBackIcon }) {
  const route = useRoute();
  const cart = useSelector((state: StoreType) => state.product.cart);

  return (
    <View style={styles.header}>
      <View>
        {showBackIcon && (
          <Ionicons
            name="arrow-back-sharp"
            size={24}
            color="#36454F"
            onPress={() => navigation.replace("Home")}
          />
        )}
      </View>
      <View style={styles.iconsWrap}>
        <Ionicons
          name="md-heart-outline"
          size={24}
          color="#36454F"
          onPress={() => {
            if (route.name !== "Wishlisted") navigation.replace("Wishlisted");
          }}
        />
        <Ionicons
          name="md-cart-outline"
          size={24}
          color="#36454F"
          onPress={() => {
            if (route.name !== "Checkout") navigation.replace("Checkout");
          }}
        />
        {cart?.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    paddingTop: 50,
    padding: 12,
    width: "100%",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  iconsWrap: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  badge: {
    position: "absolute",
    right: 7,
    top: -2,
    backgroundColor: "#f1cbbb",
    padding: 2,
    borderRadius: 30,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
