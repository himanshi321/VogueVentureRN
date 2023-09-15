import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Common/Header/Header";
import { useSelector } from "react-redux";
import { StoreType } from "../../store/StoreType";
import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import EmptyState from "../../components/Common/EmptyState/EmptyState";

export default function Checkout({ navigation }) {
  const cart = useSelector((state: StoreType) => state.product.cart);

  const getTotalCartValue = () => {
    let total = cart.reduce((acc, product) => acc + product.price, 0);
    return total.toFixed(2);
  };

  const totalAmount = useMemo(() => getTotalCartValue(), [cart]);

  return (
    <>
      <Header navigation={navigation} showBackIcon={true} />
      {cart.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardWrap}>
            {cart?.map((product) => (
              <CheckoutCard key={product.id} product={product} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <EmptyState message="Your cart is currently empty" />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Total Amount</Text>
        <Text style={styles.footerText}>${totalAmount}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    display: "flex",
    padding: 12,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: "#30363b",
  },
  footerText: {
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
