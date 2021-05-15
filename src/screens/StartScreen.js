/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { getValue } from '../DataStore/Storage'
import HeaderNavBar from '../components/HeaderNavBar'
import { checkAppUpdate } from '../DataStore/API'
import { AppDetails } from '../settings/AppSettings'

export default function StartScreen({ navigation }) {
  const [version, setVersion] = useState(AppDetails.version)
  const [androidUrl, setAndroidUrl] = useState('')
  const [iosUrl, setIosUrl] = useState('')
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
  useEffect(() => {
    const getUpdate = async () => {
      const response = await checkAppUpdate()
      console.log(response.data.version, AppDetails.version)
      if (response.data.version !== AppDetails.version) {
        console.log('will set')
        setVersion(response.data.version)
        setIosUrl(response.data.ios_url)
        setAndroidUrl(response.data.android_url)
        navigation.navigate('ForceUpdate')
      } else {
        checkToken()
      }
    }
    getUpdate()
  }, [])

  return (
    <Background>
      <HeaderNavBar navigation={navigation} goBack={false} />
      <Logo />
      <Header>Cowin Vaccine India</Header>
      <Paragraph>Get yourself Vaccinated</Paragraph>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('LoginScreen')
        }}
      >
        Book Vaccination
      </Button>
    </Background>
  )
}
