import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Header from "../../components/Common/Header/Header";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import { StoreType } from "../../store/StoreType";
import EmptyState from "../../components/Common/EmptyState/EmptyState";

export default function Wishlisted({ navigation }) {
  const wishlisted = useSelector(
    (state: StoreType) => state.product.wishlisted
  );

  return (
    <>
      <Header navigation={navigation} showBackIcon={true} />
      {
        wishlisted.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={style.cardContainer}>
              {wishlisted?.length > 0 && wishlisted?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </View>
          </View>
        </ScrollView>
        ) : (
          <EmptyState message="Your wishlist is currently empty" />
        )
      }
     
    </>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    rowGap: 12,
    padding: 12,
  },
});
