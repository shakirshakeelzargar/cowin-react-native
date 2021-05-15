/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { StyleSheet, Platform, Linking } from 'react-native'

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { AppDetails } from '../settings/AppSettings'
import { checkAppUpdate } from '../DataStore/API'

export default function ForceUpdate({ navigation }) {
  const [version, setVersion] = useState(AppDetails.version)
  const [androidUrl, setAndroidUrl] = useState('')
  const [iosUrl, setIosUrl] = useState('')

  useEffect(() => {
    const getUpdate = async () => {
      const response = await checkAppUpdate()
      console.log(response.data.version, AppDetails.version)
      console.log('will set')
      setVersion(response.data.version)
      setIosUrl(response.data.ios_url)
      setAndroidUrl(response.data.android_url)
    }
    getUpdate()
  }, [])

  return (
    <Background>
      <Logo />
      <Header>Update Available</Header>
      <Paragraph>Click to download update</Paragraph>
      <Button
        mode="contained"
        onPress={() => {
          if (Platform.OS === 'ios') {
            Linking.openURL(iosUrl)
          } else {
            Linking.openURL(androidUrl)
          }
        }}
      >
        Update Now
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
