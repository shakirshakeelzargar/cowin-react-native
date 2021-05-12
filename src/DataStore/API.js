const axios = require('axios')

export const requestOtp = async (phone) => {
  const data = JSON.stringify({
    mobile: phone,
  })

  const config = {
    method: 'post',
    url: 'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  }
  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    return { error: true, message: err.message }
  }
}

export const validateOtp = async (otp, txnId) => {
  const SHA256 = require('crypto-js/sha256')
  const CryptoJS = require('crypto-js')
  const data = JSON.stringify({
    otp: SHA256(otp).toString(CryptoJS.enc.Hex),
    txnId,
  })
  console.log(data)

  const config = {
    method: 'post',
    url: 'https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  }
  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    return { error: true, message: err.message }
  }
}

export const getStates = async () => {
  const config = {
    method: 'get',
    url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    headers: {
      accept: 'application/json',
      'Accept-Language': 'hi_IN',
    },
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    return { error: true, message: err.message }
  }
}

export const getDistrictsByState = async (stateId) => {
  const config = {
    method: 'get',
    url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`,
    headers: {
      accept: 'application/json',
      'Accept-Language': 'hi_IN',
    },
  }
  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    return { error: true, message: err.message }
  }
}

export const getCalenderByPin = async (pincode) => {
  const currentTime = new Date()

  const ISTTime = new Date(
    currentTime.getTime() + (330 + currentTime.getTimezoneOffset()) * 60000
  )
  const dd_mm_yyyy = `${('0' + ISTTime.getDate()).slice(-2)}-${(
    '0' + ISTTime.getMonth()
  ).slice(-2)}-${ISTTime.getFullYear()}`

  const config = {
    method: 'get',
    url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dd_mm_yyyy}`,
    headers: {
      accept: 'application/json',
      'Accept-Language': 'hi_IN',
    },
  }
  console.log(config)
  try {
    const response = await axios(config)
    console.log(response.data)
    return response.data
  } catch (err) {
    return { error: true, message: err.message }
  }
}
