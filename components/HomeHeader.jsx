import React from "react";
import { View, Text, Image } from "react-native";

import { COLORS, FONTS, SIZES, assets } from "../constants";

const HomeHeader = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View style={{ width: 45, height: 45 }}>
          <Image
            source={assets.person01}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 15,
              height: 15,
              bottom: 0,
              right: 0,
            }}
          />
        </View>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.medium,
            fontWeight: 400,
            marginBottom: "20px",
            color: COLORS.primary,
          }}
        >
          Hello User 👋
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.extraLarge,
            fontWeight: 900,
            color: COLORS.primary,
            marginTop: SIZES.base / 2,
          }}
        >
          EXPLORE THE MOST POPULAR NFT 🔥
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}></View>
    </View>
  );
};

export default HomeHeader;
