import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { setValue, getValue } from '../DataStore/Storage'

export default function StartScreen({ navigation }) {

  return (
    <Background>
      <Logo />
      <Header>Welcome to Cowin</Header>
      <Paragraph>Get yourself Vaccinated</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Book Vaccination
      </Button>
      {/* <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button> */}
    </Background>
  )
}
