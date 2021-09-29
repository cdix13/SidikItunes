import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { MusicItem, Separator } from '../components/Item'
import { MusicPlayer } from '../components/MusicPlayer'
import { SearchInput } from '../components/SearchInput'
import { View } from '../components/View'

export default function Home() {
  const [selectedItem, setSelectedItem] = useState({})
  const [lists, setLists] = useState([])

  const onSearching = (text) => {
    if (!selectedItem?.playing) {
      setSelectedItem({})
    }
    // Check if searched text is not blank
    if (text) {
      fetch(`https://itunes.apple.com/search?media=music&term=${text}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setLists(responseJson.results)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setLists([])
    }
  }

  // Flat List Item
  const ItemView = ({ item, index }) => (
    <MusicItem
      item={item}
      selectedItem={selectedItem}
      onPress={() => setSelectedItem({ ...item, index })}
    />
  )

  return (
    <View style={styles.container}>
      <SearchInput onChange={(text) => onSearching(text)} />
      <FlatList
        data={lists}
        keyExtractor={(item) => item.trackId.toString()}
        ItemSeparatorComponent={Separator}
        renderItem={ItemView}
      />
      {selectedItem.trackId && (
        <MusicPlayer
          selectedItem={selectedItem}
          onPrev={(index) => {
            setSelectedItem({
              ...lists[index],
              index,
              playing: selectedItem.playing,
            })
          }}
          onPlay={() =>
            setSelectedItem({
              ...selectedItem,
              playing: !selectedItem.playing,
            })
          }
          onNext={(index) => {
            setSelectedItem({
              ...lists[index],
              index,
              playing: selectedItem.playing,
            })
          }}
          totalData={lists.length}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
})
