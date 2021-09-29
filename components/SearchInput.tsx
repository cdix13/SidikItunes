import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { View } from './View'

export function SearchInput({ onChange }) {
  const colorScheme = useColorScheme()
  const [search, setSearch] = useState('')

  const handleChange = (text) => {
    setSearch(text)
    onChange(text)
  }

  return (
    <View style={styles.searchBox}>
      <TextInput
        placeholder="Search Artist"
        placeholderTextColor={Colors[colorScheme].text}
        autoCapitalize="none"
        onChangeText={(text) => handleChange(text)}
        value={search}
        underlineColorAndroid="transparent"
        style={{
          ...styles.searchInput,
          color: Colors[colorScheme].text,
        }}
      />
      <FontAwesome name="search" size={30} color={Colors[colorScheme].text} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 30,
    marginRight: 8,
  },
  searchBox: {
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
})
