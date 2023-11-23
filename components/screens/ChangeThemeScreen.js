import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeBg } from "../../slices/quoteSlice";
import * as Icon from "react-native-feather";
import { themeColor } from "../../theme";
import { useSelector } from "react-redux";

export default function ChangeThemeScreen({ navigation }) {
  const bgColor = useSelector((state) => state.quote.bgColor);
  const [colors, setColors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const handleBackground = (color) => {
    setIsVisible(true);
    dispatch(changeBg(color));
    setTimeout(() => {
      setIsVisible(false);
    }, 800);
  };
  useEffect(() => {
    const fetchColors = async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/neilharding/1e22619073eb0f2c1748a5bb1e859e14/raw/caedd7b4c1ecece3481f91bc806b4708b6adf206/gistfile1.txt"
      );
      const data = await response.json();
      setColors(data);
    };
    fetchColors();
  }, []);
  return (
    <Modal
      presentationStyle="pageSheet"
      className="flex-1 bg-yellow-300"
      animationType="slide"
      onRequestClose={() => navigation.goBack()}
      // style={{backgroundColor:bgColor}}
    >
      <TouchableOpacity
        style={{ backgroundColor: themeColor.bgColor(1) }}
        onPress={navigation.goBack}
        className="absolute z-10 rounded-full p-2 shadow top-2 left-2"
      >
        <Icon.ArrowLeft strokeWidth={4} stroke="white" />
      </TouchableOpacity>
      <View
        className="absolute pt-16 self-center z-40"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <Text className="text-center text-white font-bold text-lg">
          Theme Changed Successfully !
        </Text>
      </View>
      <ScrollView className="flex-1" style={{backgroundColor:bgColor}}>
        <Text className="text-center h-14 py-2 bg-gray-700 text-white text-lg mb-14">
          Change Theme Color
        </Text>
        <View className="flex-row gap-4 flex-wrap justify-evenly">
          {colors.map((color) => {
            return (
              <TouchableOpacity
                key={color.id}
                onPress={() => handleBackground(color.color)}
              >
                <View
                  className="w-32 h-32 rounded-lg justify-center border"
                  style={{ backgroundColor: color.color }}
                >
                  <Text className="text-center">{color.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text className="mt-8 text-gray-700 text-center font-bold text-lg">
          More Colors Will be Introduced Soon
        </Text>
      </ScrollView>
    </Modal>
  );
}
