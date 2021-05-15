/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { StyleSheet, Image, View, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { IconButton, Colors } from 'react-native-paper'

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import HeaderNavBar from '../components/HeaderNavBar'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <HeaderNavBar navigation={navigation} goBack={true} />
      {/* <Logo /> */}

      {/* <Header>Shakir Shakeel</Header> */}
      <View style={styles.icons}>
        <Image
          style={styles.image}
          source={require('../assets/ShakirLinkedin.jpeg')}
        />

        <IconButton
          icon="facebook"
          color="#3b5998"
          size={40}
          onPress={() => {
            Linking.openURL('fb://profile/100041448017979/')
            console.log('Pressed')
          }}
        />
        <IconButton
          icon="instagram"
          color="#cd486b"
          size={40}
          onPress={() => {
            Linking.openURL('https://www.instagram.com/sshakirzargar/')
            console.log('Pressed')
          }}
        />
        <IconButton
          icon="github"
          color="black"
          size={40}
          onPress={() => {
            Linking.openURL('https://github.com/shakirshakeelzargar/')
            console.log('Pressed')
          }}
        />
        <IconButton
          icon="whatsapp"
          color="#128C7E"
          size={40}
          onPress={() => {
            Linking.openURL('whatsapp://send?text=Hi&phone=+918742999555')
            console.log('Pressed')
          }}
        />
      </View>

      {/* <Header>Ashir Ehsan</Header> */}
      <View style={styles.icons}>
        <Image
          style={styles.image}
          source={require('../assets/AshirLinkedin.jpeg')}
        />

        <IconButton
          icon="facebook"
          color="#3b5998"
          size={40}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="instagram"
          color="#cd486b"
          size={40}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="github"
          color="black"
          size={40}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="whatsapp"
          color="#128C7E"
          size={40}
          onPress={() => console.log('Pressed')}
        />
      </View>

      {/* <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button> */}
    </Background>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    // paddingRight: 30,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
