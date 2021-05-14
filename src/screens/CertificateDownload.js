/* eslint-disable no-unreachable */
import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { setValue, getValue } from '../DataStore/Storage'
import TextInput from '../components/TextInput'
import { getCertificate } from '../DataStore/API'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text, Snackbar } from 'react-native-paper'

import PDFReader from 'rn-pdf-reader-js'
import HeaderNavBar from '../components/HeaderNavBar'

export default function CertificateDownload({ navigation }) {
  const [refid, setRefid] = useState({ value: '', error: '' })

  const [visible, setVisible] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')

  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)

  const validateCertificate = async () => {
    const token = await getValue('api_token')
    const response = await getCertificate(refid.value, token)

    if (
      response.status === 400 ||
      response.status === 401 ||
      response.status != 200
    ) {
      setSnackMessage(
        `Download Error.${response.message}` || 'Some error occured'
      )
      setVisible(true)
    } else {
      const temp = await setValue('pdf', response.files)
      // navigation.navigate('ViewPdf')
    }
  }
  return (
    <Background>
      <HeaderNavBar navigation={navigation} goBack={true} />
      <Logo />
      <Header>Download Certificate</Header>
      <Header>Coming Soon . . .</Header>
    </Background>
  )
  return (
    <Background>
      <HeaderNavBar navigation={navigation} goBack={true} />
      <Logo />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {
            // Do something
          },
        }}
      >
        {snackMessage}
      </Snackbar>
      <Header>Download your Certificate</Header>
      <TextInput
        label="Reference ID"
        returnKeyType="next"
        value={refid.value}
        onChangeText={(text) => setRefid({ value: text, error: '' })}
        error={!!refid.error}
        errorText={refid.error}
      />

      <View>
        <Button mode="contained" onPress={validateCertificate}>
          {' '}
          Submit
        </Button>
      </View>
    </Background>
  )
}
