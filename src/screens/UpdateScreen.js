/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { IconButton, Colors, Text } from 'react-native-paper'

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import HeaderNavBar from '../components/HeaderNavBar'
import { AppDetails } from '../settings/AppSettings'
import { checkAppUpdate } from '../DataStore/API'
export default function UpdateScreen({ navigation }) {
  const [version, setVersion] = useState(AppDetails.version)
  const [check, setCheck] = useState(true)
  useEffect(() => {
    const getUpdate = async () => {
      const response = await checkAppUpdate()
      console.log(response.data.version,AppDetails.version)
      if (response.data.version!==AppDetails.version) {
        console.log("will set")
        setVersion(response.data.version)
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
              console.log('Downloading Update')
            }}
          >
            Download Update
          </Button>
        </View>
      )}
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
