import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants/theme";
import HomeHeader from "../components/HomeHeader";
import NftCard from "../components/NftCard";

const TOKEN = "cqt_rQ4rjPvbKdDRJCTVHyDWxdhH4hPp";
const CONTRACT_ADDRESS = "0x8821bee2ba0df28761afff119d66390d594cd280";

const PAGE_SIZE = 20;
const MAX_PAGE_NUMBER = 10; 

const fetchNFTMetadata = async (pageNumber) => {
  const url = `https://api.covalenthq.com/v1/eth-mainnet/nft/${CONTRACT_ADDRESS}/metadata/?page-size=${PAGE_SIZE}&page-number=${pageNumber}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data?.data?.items;
};

const Home = ({ route }) => {
  const [nftData, setNftData] = useState([]);
  const [error, setError] = useState(null);
  const [bookmarkedId, setBookmarkedId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadMoreData = async () => {
    if (loading || page > MAX_PAGE_NUMBER) return;
    setLoading(true);

    try {
      const newNFTs = await fetchNFTMetadata(page);
      setNftData((prevNFTs) => [...prevNFTs, ...newNFTs]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    setPage(0);

    try {
      const newNFTs = await fetchNFTMetadata(1);
      setNftData(newNFTs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    
    loadMoreData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const getIds = async () => {
        const id = await AsyncStorage.getItem("id");
        setBookmarkedId(JSON.parse(id) || []);
      };
      getIds();
    }, [])
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNFTMetadata(0);
        setNftData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []);

  const storeData = (value) => {
    try {
      if (new Set(bookmarkedId).has(value)) {
        const filteredIds = bookmarkedId.filter((item) => item !== value);
        setBookmarkedId(filteredIds);
        AsyncStorage.setItem("id", JSON.stringify(filteredIds));
      } else {
        setBookmarkedId([...bookmarkedId, value]);
        AsyncStorage.setItem("id", JSON.stringify([...bookmarkedId, value]));
      }
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />

      <View
        style={{ flex: 1, padding: SIZES.medium }}
        backgroundColor={COLORS.white}
      >
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={
              route?.name !== "Bookmarks"
                ? nftData
                : nftData?.filter((item) =>
                    new Set(bookmarkedId).has(item?.nft_data?.token_id)
                  )
            }
            renderItem={({ item }, index) => (
              <NftCard
                data={item}
                isBookmarked={new Set(bookmarkedId).has(
                  item?.nft_data?.token_id
                )}
                setBookmark={storeData}
              />
            )}
            keyExtractor={(item, index) => `nft-${index}`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader />}
            ListFooterComponent={() =>
              loading ? <ActivityIndicator size="large" /> : null
            }
            onEndReached={() => {
              if (page < 895) loadMoreData();
            }}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={refreshData}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
