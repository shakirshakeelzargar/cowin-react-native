import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const HeaderNavBar = ({ navigation, goBack }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss()
          navigation.openDrawer()
        }}
      >
        <Image
          style={styles.image}
          source={require('../assets/navdrawericon.png')}
        />
      </TouchableOpacity>
      {goBack && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            style={styles.image}
            source={require('../assets/arrow_back.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default HeaderNavBar

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('window').width - 20,
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // left: 4
  },
  image: {
    width: 24,
    height: 24,
    paddingRight: 30,
  },
})
