import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { WebView } from 'react-native-webview'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import BackButton from '../components/BackButton'

const WebViewRegistration = ({ navigation }) => {
  const uri = 'https://selfregistration.cowin.gov.in/'
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CheckAvailability')
        }}
        style={styles.container}
      >
        <Image
          style={styles.image}
          source={require('../assets/arrow_back.png')}
        />
      </TouchableOpacity>
      <WebView source={{ uri }} style={{ flex: 1 }} />
    </View>
  )
}

export default WebViewRegistration

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 10 + getStatusBarHeight(),
    // left: 4,
    marginTop: 40,
  },
  image: {
    width: 36,
    height: 36,
  },
})
