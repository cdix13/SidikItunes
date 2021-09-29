import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { Text } from './Text'
import { View } from './View'

export const MusicPlayer = ({
  selectedItem,
  onPrev,
  onPlay,
  onNext,
  totalData,
}) => {
  const colorScheme = useColorScheme()

  return (
    <View style={styles.player}>
      <View style={styles.playerBtn}>
        <FontAwesome
          onPress={() => {
            if (selectedItem.index > 0) {
              onPrev(selectedItem.index - 1)
            }
          }}
          name="angle-double-left"
          size={40}
          color={Colors[colorScheme].text}
        />
        <FontAwesome
          onPress={onPlay}
          name={selectedItem.playing ? 'pause' : 'play-circle'}
          size={70}
          color={Colors[colorScheme].text}
        />
        <FontAwesome
          onPress={() => {
            if (selectedItem.index + 1 < totalData) {
              onNext(selectedItem.index + 1)
            }
          }}
          name="angle-double-right"
          size={40}
          color={Colors[colorScheme].text}
        />
      </View>
      {selectedItem.playing && <Text>Playing {selectedItem.trackName}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  player: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  playerBtn: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
})
