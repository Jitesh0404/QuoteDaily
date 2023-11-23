import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  PermissionsAndroid
} from "react-native";

//snapshot
import { useRef} from "react";

import * as Icon from "react-native-feather";
import quotes from "../../Data/Quotes.js";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { themeColor } from "../../theme/index.js";
import QuotesRender from "../QuotesRender.js";
import { addQuotes } from "../../slices/quoteSlice.js";
//share import
import { Share } from "react-native";
import { captureRef } from "react-native-view-shot";
const Logo = require("../../assets/logo/logo.png");
export default function Home({ navigation }) {
  
  const dispatch = useDispatch();
  const [todayQuote, setTodayQuote] = useState({});
  const { bgColor, quotesCollection } = useSelector((state) => state.quote);
  //snapshot
  const viewToSnapShotRef = useRef();
  const [snapShotImage,setSnapShotImage] = useState();
  const snapshot = async()=>{
    const result = await captureRef(viewToSnapShotRef);
    console.log("Result is : ",result); 
    setSnapShotImage(result)

  }
  //refreshing
  const [refreshing, setRefreshing] = useState(false);

  //loading
  const [loading, setLoading] = useState(false);
  //share quote implementation
  const shareQuote = async (quoteText) => {
    try {
      const textToShare = quoteText;
      await Share.share({
        message: textToShare,
      });
    } catch (error) {
      console.error("Error while sharing text:", error.message);
    }
  };
  const handleDownload = () => {
    snapshot();
    alert("Image uri is generated. But saving image need to implement")
    console.log("Button click to download");
  };
  const handleShare = (quoteText) => {
    shareQuote(quoteText);
  };

  const fetchDailyQuote = () => {
    setRefreshing(true);
    const randomNo = Math.floor(Math.random() * 100);
    console.log("Random no : ", randomNo);
    setTodayQuote(quotes[randomNo]);
    setRefreshing(false);
  };
  const handleRefresh = () => {
    fetchDailyQuote();
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      const response = await fetch("https://api.quotable.io/quotes");
      const data = await response.json();
      const quotes = data.results;
      dispatch(addQuotes(quotes));
      setLoading(false);
      console.log("Fetched Data is : ", quotes);
      console.log("Fetched Data is : ");
    };
    fetchQuotes();
    fetchDailyQuote();

  }, []);
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bgColor }}>
      {loading ? (
        <View className="flex-1 justify-center self-center">
          <Text className="text-2xl text-gray-700">Loading...</Text>
        </View>
      ) : (
        <View>
          <View className="bg-gray-700 h-14 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Image source={Logo} className="h-10 w-10 ml-2" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChangeTheme")}
            >
              <View
                className="p-3 mr-2 rounded-full"
                style={{ backgroundColor: themeColor.bgColor(1) }}
              >
                <Icon.Sliders
                  height={20}
                  width={20}
                  stroke="white"
                  strokeWidth={3}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* quote of day */}
          <View className="items-center">
            <Text className="text-justify text-lg text-black font-extrabold my-2">
              Quote of the Day !!
            </Text>
            <View
              className="bg-white mr-1 rounded-3xl shadow-lg p-3 justify-between"
              style={{ ...styles.card, width: 300, height: 230 }}
            >
              <Text className="text-justify text-lg">{todayQuote.quote}</Text>
              <Text className="text-justify text-lg text-gray-700 font-extrabold">
                By: "{todayQuote.author}"
              </Text>
            </View>
          </View>
          <View className="items-center ml-5 mt-5">
            <TouchableOpacity
              onPressIn={() => navigation.navigate("ShowAllQuotes")}
            >
              <View
                style={{ backgroundColor: themeColor.bgColor(1) }}
                className="p-2 rounded-lg mb-2 relative -right-28"
              >
                <Text className="text-white font-bold text-lg">Show All</Text>
              </View>
            </TouchableOpacity>
            <FlatList
              data={quotesCollection}
              renderItem={({ item }) => {
                return (
                  <View ref={viewToSnapShotRef}
                    style={styles.card}
                    className="bg-white mr-6 rounded-3xl shadow-lg p-4 justify-between z-20"
                  >
                    <Text className="text-justify text-lg">{item.content}</Text>
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
                      <TouchableOpacity
                        onPress={() => handleShare(item.content)}
                      >
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
              horizontal
              showsVerticalScrollIndicator={false}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          </View>
        </View>
      )}
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
