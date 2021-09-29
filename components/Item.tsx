import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import useColorScheme from '../hooks/useColorScheme'
import { Text } from './Text'
import { View } from './View'

export const MusicItem = ({ item, selectedItem, onPress }) => {
  const colorScheme = useColorScheme()

  return (
    <TouchableWithoutFeedback onPress={onPress}>
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
              name={selectedItem.playing ? 'pause' : 'music'}
              size={20}
              color={Colors[colorScheme].text}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export const Separator = () => <View style={styles.separator} />

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    height: 1,
    width: Layout.window.width,
    backgroundColor: '#C8C8C8',
  },
  itemContainer: {
    width: Layout.window.width,
    flexDirection: 'row',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemInfo: {
    width: Layout.window.width - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemSong: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
