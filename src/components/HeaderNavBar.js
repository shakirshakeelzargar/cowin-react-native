import React from 'react'

import { StyleSheet, View, Dimensions, Keyboard } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HeaderNavBar = ({ navigation, goBack, resetScreen, whichScreen }) => {
  return (
    <View style={styles.root}>
      <MaterialCommunityIcons
        name="format-list-bulleted"
        color="black"
        size={40}
        onPress={() => {
          Keyboard.dismiss()
          navigation.openDrawer()
        }}
      />
      {goBack && (
        <MaterialCommunityIcons
          name="arrow-left-circle"
          color="black"
          size={40}
          onPress={() => {
            Keyboard.dismiss()

            if (resetScreen) {
              navigation.reset({
                index: 0,
                routes: [{ name: whichScreen }],
              })
            } else {
              navigation.goBack()
            }
          }}
        />
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
    paddingRight: 50,
  },
})
