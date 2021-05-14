import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    // <TouchableOpacity onPress={goBack} style={styles.container}>
    //   <Image
    //     style={styles.image}
    //     source={require('../assets/arrow_back.png')}
    //   />
    // </TouchableOpacity>
    <View></View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
