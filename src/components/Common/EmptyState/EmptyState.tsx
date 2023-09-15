import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";

const EmptyState = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

interface Props {
  message: string;
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: "center",
   justifyContent: 'center',
  },
  text: {
    color: '#9f9d9d'
  }
});

export default EmptyState;
