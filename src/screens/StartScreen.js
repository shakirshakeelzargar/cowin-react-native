/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import jwt_decode from 'jwt-decode'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { setValue, getValue } from '../DataStore/Storage'

export default function StartScreen({ navigation }) {
  const checkToken = async () => {
    try {
      const token = await getValue('api_token')
      if (token !== 'not_found') {
        const decoded = jwt_decode(token)
        const exp = decoded.exp
        const isExp = Date.now() >= exp * 1000
        if (isExp === false) {
          navigation.navigate('Dashboard')
        }
      }
      return ''
    } catch (err) {
      console.log(err.message)
    }
  }
  checkToken()
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
