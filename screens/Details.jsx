import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, FONTS } from "../constants/theme";
import { useFocusEffect } from "@react-navigation/native";

const Details = ({ route, navigation }) => {
  const { data, isBookmarked } = route.params;

  const [bookmarked, setBookmarked] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setBookmarked(isBookmarked);
    }, [])
  );

  const storeData = async (value) => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (bookmarked) {
        const filteredIds = [...(JSON.parse(id) || [])].filter(
          (item) => item !== value
        );
        setBookmarked(false);
        AsyncStorage.setItem("id", JSON.stringify(filteredIds));
      } else {
        setBookmarked(true);
        AsyncStorage.setItem(
          "id",
          JSON.stringify([...(JSON.parse(id) || []), value])
        );
      }
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ width: "100%", height: 373, padding: SIZES.medium }}>
        <Image
          source={{ uri: data?.nft_data?.external_data?.image_512 }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            left: 25,
            top: 25,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.extraLarge,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="return-up-back-outline"
            position="absolute"
            size={24}
            right={9}
            top={10}
            color={"gray"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            right: 25,
            top: 25,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.extraLarge,
          }}
          onPress={() => {
            storeData(data?.nft_data?.token_id);
          }}
        >
          {!bookmarked ? (
            <Ionicons
              name="bookmarks-outline"
              position="absolute"
              size={24}
              right={9}
              top={10}
              color={"gray"}
            />
          ) : (
            <Ionicons
              name="bookmarks"
              position="absolute"
              size={24}
              right={9}
              top={10}
              color={"brown"}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.extraLarge,
            fontWeight: 900,
            color: COLORS.primary,
            marginTop: SIZES.base,
            marginBottom: 15,
          }}
        >
          {data?.nft_data?.external_data?.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.large,
            fontWeight: 700,
            color: COLORS.primary,
            marginTop: SIZES.base,
            marginBottom: 7,
          }}
        >
          NFT Attributes
        </Text>

        <ScrollView style={{ paddingBottom: "90%" }}>
          {data?.nft_data?.external_data?.attributes?.map((item, index) => (
            <View
              style={{
                minWidth: "100%",
                borderBottomWidth: 1,
                borderBottomColor: COLORS.gray,
              }}
              key={`attributes-${index}`}
            >
              <Text
                style={{
                  fontFamily: FONTS.light,
                  fontSize: SIZES.font,
                  fontWeight: 400,
                  color: COLORS.secondary,

                  marginTop: SIZES.base,
                }}
              >
                {item.trait_type}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: SIZES.large,
                  fontWeight: 900,
                  color: COLORS.secondary,
                  marginTop: 2,
                  marginBottom: 5,
                }}
              >
                {item?.value}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <StatusBar />
    </SafeAreaView>
  );
};

export default Details;
