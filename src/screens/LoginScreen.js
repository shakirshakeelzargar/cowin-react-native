/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import React, { useState } from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import CountDown from 'react-native-countdown-component'
import { Snackbar } from 'react-native-paper'
import jwt_decode from 'jwt-decode'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { phoneValidator } from '../helpers/phoneValidator'
import { otpValidator } from '../helpers/otpValidator'
import { requestOtp, validateOtp } from '../DataStore/API'
import { setValue, getValue } from '../DataStore/Storage'
import HeaderNavBar from '../components/HeaderNavBar'

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [otp, setOtp] = useState({ value: '', error: '' })
  const [showPhone, setShowPhone] = useState(true)
  const [showOtp, setShowOtp] = useState(false)
  const [phoneInputDisabledState, setPhoneInputDisabledState] = useState(false)
  const [disableReqButton, setDisableReqButton] = useState(false)
  const [reqButtontext, setReqButtontext] = useState('Request OTP')
  const [otpInputDisabledState, setOtpInputDisabledState] = useState(false)
  const [disabledOtpButton, setDisabledOtpButton] = useState(false)
  const [optButtonText, setOptButtonText] = useState('Validate OTP')
  const [visible, setVisible] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')
  const [txnId, setTxnId] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [counter, setCounter] = useState(180)
  const onToggleSnackBar = () => setVisible(!visible)

  const onDismissSnackBar = () => setVisible(false)

  const onValidateOtp = async () => {
    const otpError = otpValidator(otp.value)
    if (otpError) {
      setOtp({ ...otp, error: otpError })
      return ''
    }
    Keyboard.dismiss()
    setOptButtonText('Validating OTP...')
    setDisabledOtpButton(true)
    const response = await validateOtp(otp.value, txnId)
    // console.log(response)
    if (response.error || response.status === 400 || !response.token) {
      // console.log(response)
      setDisabledOtpButton(false)
      setOptButtonText('Validate OTP')
      setSnackMessage(
        `Invalid OTP or ${response.message}` || 'Some error occured'
      )
      setVisible(true)
    } else {
      const temp = await setValue('api_token', response.token)
      const decoded = jwt_decode(response.token)
      // console.log(decoded)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }
  }

  const onReqOtppressed = async () => {
    const phoneError = phoneValidator(phone.value)
    if (phoneError) {
      setPhone({ ...phone, error: phoneError })
      return ''
    }
    Keyboard.dismiss()
    setReqButtontext('Requesting...')
    setDisableReqButton(true)
    const response = await requestOtp(phone.value)
    // console.log(response)
    if (response.error || response.status === 400 || !response.txnId) {
      // console.log(response)
      setDisableReqButton(false)
      setReqButtontext('Request OTP')
      setPhoneInputDisabledState(false)
      setSnackMessage(
        `Too many requests or ${response.message}` || 'Some error occured'
      )
      setVisible(true)
    } else {
      const temp = await setValue('txnId', response.txnId)
      setTxnId(response.txnId)
      setShowPhone(false)
      setShowOtp(true)
      setCounter(180)
      setDisabled(true)
    }
  }
  const changeNumber = () => {
    setShowPhone(true)
    setShowOtp(false)
    setCounter(180)
    setDisabled(true)
    setReqButtontext('Request OTP')
    setDisableReqButton(false)
  }
  return (
    <Background>
      <HeaderNavBar navigation={navigation} goBack={false} />
      {/* <BackButton goBack={navigation.goBack} /> */}
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
      <Logo />
      <Header>Login with Phone</Header>
      {showPhone && (
        <View style={{ width: '100%' }}>
          <TextInput
            label="Phone Number"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
            autoCapitalize="none"
          />
          <Button
            mode="contained"
            onPress={onReqOtppressed}
            disabled={disableReqButton}
          >
            {reqButtontext}
          </Button>
        </View>
      )}
      {showOtp && (
        <View style={{ width: '100%' }}>
          <TextInput
            label="Otp"
            returnKeyType="done"
            value={otp.value}
            onChangeText={(text) => setOtp({ value: text, error: '' })}
            error={!!otp.error}
            errorText={otp.error}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={onValidateOtp}
            disabled={disabledOtpButton}
          >
            {optButtonText}
          </Button>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              style={{ width: '50%' }}
              mode="outlined"
              onPress={onReqOtppressed}
              disabled={disabled}
            >
              Resend OTP
            </Button>
            <CountDown
              key={counter}
              until={counter}
              size={15}
              onFinish={() => setDisabled(() => false)}
              separatorStyle={{ color: 'black' }}
              digitStyle={{ backgroundColor: '#FFF' }}
              digitTxtStyle={{ color: 'black' }}
              timeToShow={['M', 'S']}
              showSeparator
              timeLabels={{ m: '', s: '' }}
            />
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              style={{ width: '75%' }}
              mode="outlined"
              onPress={changeNumber}
            >
              Change Number
            </Button>
          </View>
        </View>
      )}

      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
