import React from 'react'
import { StyleSheet, View } from 'react-native'
import { List } from 'react-native-paper'
import Logo from './Logo'

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <Logo />
      <View style={{ width: '100%' }}>
        <List.Item
          title="Vaccine Home"
          left={(props) => <List.Icon {...props} icon="home" />}
          onPress={() => {
            // console.log('Pressed')
            navigation.navigate('StartScreen')
          }}
        />
        <List.Item
          title="Check for Updates"
          left={(props) => <List.Icon {...props} icon="update" />}
          onPress={() => {
            // console.log('Pressed')
            navigation.navigate('UpdateScreen')
          }}
        />
        <List.Item
          title="Developers"
          left={(props) => <List.Icon {...props} icon="code-tags" />}
          onPress={() => {
            // console.log('Pressed')
            navigation.navigate('DeveloperScreen')
            // console.log('Pressed')
          }}
        />
      </View>
    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({
  root: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
