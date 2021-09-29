import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function MusicPlayer() {
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [lists, setLists] = useState([]);

  // useEffect(() => {
  //   // fetch("https://itunes.apple.com/search?term=taylor+swift&media=music")
  //   //   .then((response) => response.json())
  //   //   .then((responseJson) => {
  //   //     console.log(responseJson.results);
  //   //     // setFilteredDataSource(responseJson);
  //   //     // setMasterDataSource(responseJson);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   });
  //   // fetch("https://jsonplaceholder.typicode.com/posts")
  //   //   .then((response) => response.json())
  //   //   .then((responseJson) => {
  //   //     setFilteredDataSource(responseJson);
  //   //     setMasterDataSource(responseJson);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   });
  // }, []);

  const searchFilterFunction = (text) => {
    if (!selectedItem?.playing) {
      setSelectedItem({});
    }
    // Check if searched text is not blank
    if (text) {
      fetch(`https://itunes.apple.com/search?media=music&term=${text}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setLists(responseJson.results);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setLists([]);
    }
    setSearch(text);
  };

  // Flat List Item
  const ItemView2 = ({ item, index }) => (
    <TouchableWithoutFeedback
      onPress={() => setSelectedItem({ ...item, index })}
    >
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.artworkUrl60 }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <View>
            <Text style={styles.itemSong}>{item.trackName}</Text>
            <Text style={styles.itemArtist}>{item.artistName}</Text>
            <Text style={styles.itemOtherInfo}>
              Album {item.collectionName}
            </Text>
          </View>
          {selectedItem?.trackId == item.trackId && (
            <FontAwesome
              name={selectedItem.playing ? "pause" : "play"}
              size={20}
              color={Colors[colorScheme].text}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  // Flat List Item Separator
  const ItemSeparatorView = () => <View style={styles.separator} />;

  // console.log(selectedItem);
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor={Colors[colorScheme].text}
          autoCapitalize="none"
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          style={{
            ...styles.searchInput,
            color: Colors[colorScheme].text,
          }}
        />
        <FontAwesome name="search" size={30} color={Colors[colorScheme].text} />
      </View>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.trackId.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView2}
      />
      {selectedItem.trackId && (
        <View style={styles.player}>
          <View style={styles.playerBtn}>
            <FontAwesome
              onPress={() => {
                if (selectedItem.index > 0) {
                  const index = selectedItem.index - 1;
                  setSelectedItem({
                    ...lists[index],
                    index,
                    playing: selectedItem.playing,
                  });
                }
              }}
              name="angle-double-left"
              size={40}
              color={Colors[colorScheme].text}
            />
            <FontAwesome
              onPress={() =>
                setSelectedItem({
                  ...selectedItem,
                  playing: !selectedItem.playing,
                })
              }
              name={selectedItem.playing ? "pause" : "play-circle"}
              size={70}
              color={Colors[colorScheme].text}
            />
            <FontAwesome
              onPress={() => {
                if (selectedItem.index + 1 < lists.length) {
                  const index = selectedItem.index + 1;
                  setSelectedItem({
                    ...lists[index],
                    index,
                    playing: selectedItem.playing,
                  });
                }
              }}
              name="angle-double-right"
              size={40}
              color={Colors[colorScheme].text}
            />
          </View>
          {selectedItem.playing && (
            <Text>Playing {selectedItem.trackName}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  player: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
  },
  playerBtn: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
    backgroundColor: "#C8C8C8",
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemInfo: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemSong: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 30,
    marginRight: 8,
  },
  searchBox: {
    marginTop: Platform.OS === "ios" ? 60 : 30,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
});
