import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text, Snackbar } from 'react-native-paper'
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

  const onToggleSnackBar = () => setVisible(!visible)

  const onDismissSnackBar = () => setVisible(false)
  const onValidateOtp = async () => {
    const otpError = otpValidator(otp.value)
    if (otpError) {
      setOtp({ ...otp, error: otpError })
      return ''
    }
    setOptButtonText('Validating OTP...')
    setDisabledOtpButton(true)
    const response = await validateOtp(otp.value, txnId)
    console.log(response)
    if (response.error || response.status === 400 || !response.token) {
      console.log(response)
      setDisabledOtpButton(false)
      setOptButtonText('Validate OTP')
      setSnackMessage(
        `Invalid OTP or ${response.message}` || 'Some error occured'
      )
      setVisible(true)
    } else {
      const temp = await setValue('api_token', response.token)
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
    setReqButtontext('Requesting...')
    setDisableReqButton(true)
    const response = await requestOtp(phone.value)
    console.log(response)
    if (response.error || response.status === 400 || !response.txnId) {
      console.log(response)
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
    }
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
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
      <Header>Welcome back.</Header>
      {showPhone && (
        <View>
          <TextInput
            label="Phone Number"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
            autoCapitalize="none"
            autoCompleteType="phone"
            textContentType="phoneNumber"
            keyboardType="phone-number"
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
        <View>
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
