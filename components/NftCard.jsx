import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, SHADOWS, FONTS } from "../constants";
import { RectButton } from "./Button";
import Ionicons from "@expo/vector-icons/Ionicons";

const NftCard = ({ data, isBookmarked, setBookmark }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
          position: "relative",
        }}
      >
        <Image
          source={{ uri: data?.nft_data?.external_data?.image_512 }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
            borderBottomRightRadius: SIZES.font,
            borderBottomLeftRadius: SIZES.font,
          }}
        />

        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            right: 10,
            top: 10,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.extraLarge,
          }}
          onPress={() => {
            setBookmark(data?.nft_data?.token_id);
          }}
        >
          {!isBookmarked ? (
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

        <View
          style={{
            width: "100%",
            padding: SIZES.font,
            position: "absolute",
            bottom: 0,
            backgroundColor: "rgba(16 , 16 ,16 , 0.3)",
            borderBottomRightRadius: SIZES.font,
            borderBottomLeftRadius: SIZES.font,
            display: "flex",
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
              color: COLORS.white,
              fontWeight: 900,
              marginTop: SIZES.base / 2,
            }}
          >
            {data?.nft_data?.external_data?.name}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.small,
              color: COLORS.white,
              fontWeight: 600,
              marginTop: SIZES.base / 2,
            }}
          >
            {data?.nft_data?.current_owner}
          </Text>

          <View
            style={{
              marginTop: SIZES.font,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <RectButton
              minWidth={50}
              fontSize={SIZES.font}
              handlePress={() =>
                navigation.navigate("Details", { data, isBookmarked })
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NftCard;
