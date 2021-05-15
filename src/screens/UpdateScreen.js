/* eslint-disable react/jsx-boolean-value */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Linking, Platform, StyleSheet, View } from 'react-native'

import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import HeaderNavBar from '../components/HeaderNavBar'
import { AppDetails } from '../settings/AppSettings'
import { checkAppUpdate } from '../DataStore/API'

export default function UpdateScreen({ navigation }) {
  const [version, setVersion] = useState(AppDetails.version)
  const [check, setCheck] = useState(true)
  const [androidUrl, setAndroidUrl] = useState('')
  const [iosUrl, setIosUrl] = useState('')
  useEffect(() => {
    const getUpdate = async () => {
      const response = await checkAppUpdate()
      // console.log(response.data.version, AppDetails.version)
      if (response.data.version !== AppDetails.version) {
        console.log('will set')
        setVersion(response.data.version)
        setIosUrl(response.data.ios_url)
        setAndroidUrl(response.data.android_url)
      }
    }
    getUpdate()
  }, [check])
  return (
    <Background>
      <HeaderNavBar navigation={navigation} goBack={true} />
      {/* <Logo /> */}
      {AppDetails.version === version && (
        <View>
          <Header>Already Up to Date</Header>
          <Button
            mode="outlined"
            onPress={() => {
              setCheck(!check)
            }}
          >
            Check Update
          </Button>
        </View>
      )}
      {AppDetails.version !== version && (
        <View style={{ width: '100%' }}>
          <Button
            mode="outlined"
            onPress={() => {
              if (Platform.OS === 'ios') {
                Linking.openURL(iosUrl)
              } else {
                Linking.openURL(androidUrl)
              }
            }}
          >
            Download Update
          </Button>
        </View>
      )}
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
