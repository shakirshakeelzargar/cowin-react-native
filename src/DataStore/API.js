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
    txnId: txnId
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
