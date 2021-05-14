/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { StyleSheet, Image, View } from 'react-native'
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
      <Header>Shakir Shakeel</Header>
      <Image
        style={styles.image}
        source={require('../assets/ShakirLinkedin.jpeg')}
      />
      <View style={styles.icons}>
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

      <Header>Ashir Ehsan</Header>
      <Image
        style={styles.image}
        source={require('../assets/AshirLinkedin.jpeg')}
      />
      <View style={styles.icons}>
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
    width: 120,
    height: 120,
    // paddingRight: 30,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
  },
})
