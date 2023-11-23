import { View, Text,StyleSheet } from "react-native";
import React from "react";
import { themeColor } from "../theme";
import { useSelector } from "react-redux";
export default function QuotesRender({item}) {
  const bgColor = useSelector((state) => state.quote.bgColor);
  return (
    <View
      className="bg-white mr-6 rounded-3xl shadow-lg p-3 justify-between"
      style={{...styles.card,backgroundColor:bgColor}}
    >
      <Text className="text-justify text-lg" style={{color:bgColor!=="white"?"white" : "black"}}>{item.quote}</Text>
      <Text className="text-justify text-lg text-gray-700 font-bold" style={{color:bgColor!=="white"?"white" : "black"}}>
        By: "{item.author}"
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
    card: {
      width: 280,
      height: 240,
      shadowColor: themeColor.bgColor(1),
      shadowOffset: { width: 4, height: 4 },
      shadowRadius: 14,
      shadowRadius: 3,
      elevation: 20,
    },
  });
