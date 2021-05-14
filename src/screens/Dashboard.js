/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { setValue } from '../DataStore/Storage'
import HeaderNavBar from '../components/HeaderNavBar'

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <HeaderNavBar navigation={navigation} goBack={false} />
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Select your option below.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('SearchSlots')}
      >
        Search Slots
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('CertificateDownload')}
      >
        Download Certificate
      </Button>

      <Button
        mode="outlined"
        onPress={async () => {
          const temp = await setValue('api_token', '')
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }}
      >
        Logout
      </Button>
    </Background>
  )
}
