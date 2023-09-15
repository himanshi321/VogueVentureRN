import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getProducts } from "../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../store/StoreType";
import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/Common/Header/Header";

export default function Home({ navigation }) {
  const dispatch = useDispatch<any>();
  const products = useSelector((state: StoreType) => state.product.data);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Header navigation={navigation} showBackIcon={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={style.cardContainer}>
            {products?.length > 0 ? (
              products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
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
