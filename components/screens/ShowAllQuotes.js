import {
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Icon from "react-native-feather";
import { themeColor } from "../../theme";
import { useSelector, useDispatch } from "react-redux";
//share import
import { Share } from 'react-native';
export default function ShowAllQuotes() {
  const { bgColor, quotesCollection } = useSelector((state) => state.quote);
  const [textInput, setTextInput] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState(quotesCollection);
  const filterQuote = (text) => {
    const newData = quotesCollection.filter((item) => {
      return item.author.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredQuotes(newData);
  };

  //share quote
  const shareQuote = async (quoteText) => {
    try {
      const textToShare = quoteText;
      await Share.share({
        message: textToShare,
      });
    } catch (error) {
      console.error('Error while sharing text:', error.message);
    }
  };
  const handleShare = (quoteText) => {
    shareQuote(quoteText)
  };

  return (
    <SafeAreaView
      className="flex-1"
    >
      <View className="flex-1">
        <ScrollView className="flex-1" style={{ backgroundColor: bgColor,paddingTop: Platform.OS === "android" ? 20 : 0 }}>
          <View className="flex-1 justify-center self-center">
            <TextInput
              value={textInput}
              onChangeText={setTextInput}
              placeholder="TYPE OF MOTIVATION"
              className="border p-3 w-80 rounded-lg text-gray-700 text-lg"
            />
            <TouchableOpacity
              className="absolute right-0"
              onPressIn={() => filterQuote(textInput)}
            >
              <View
                className="mr-0 p-3 rounded-lg"
                style={{ backgroundColor: themeColor.bgColor(1) }}
              >
                <Icon.Search width={30} height={30} stroke="white" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-1 mt-4 justify-center self-center ml-4">
            {filteredQuotes.length === 0 ? (
              <View className="mt-4">
                <Text className="text-red-700 font-bold text-lg">
                  😟 Opps!! Authors Details not found!.😟{" "}
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredQuotes}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={styles.card}
                      className="bg-white mr-6 rounded-3xl shadow-lg p-4 justify-between mt-4"
                    >
                      <Text className="text-justify text-lg">
                        {item.content}
                      </Text>
                      <Text className="text-justify text-lg text-gray-700 font-extrabold">
                        By: "{item.author}"
                      </Text>
                      <View
                        className="p-3 mr-2 rounded-full flex-row justify-evenly"
                        style={{ backgroundColor: themeColor.bgColor(1) }}
                      >
                        <TouchableOpacity onPress={() => handleDownload()}>
                          <Icon.Download
                            height={20}
                            width={20}
                            stroke="white"
                            strokeWidth={3}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleShare(item.content)}>
                          <Icon.Share2
                            height={20}
                            width={20}
                            stroke="white"
                            strokeWidth={3}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 250,
    shadowColor: themeColor.bgColor(1),
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 14,
    shadowRadius: 3,
    elevation: 20,
  },
});
