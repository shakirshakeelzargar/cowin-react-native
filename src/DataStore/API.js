/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const axios = require('axios')
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
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
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
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
  // console.log(data)

  const config = {
    method: 'post',
    url: 'https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
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

export const getCertificate = async (requestID, tokenID) => {
  // console.log(tokenID)
  // console.log(requestID)
  const config = {
    method: 'get',
    url:
      'https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=' +
      requestID,
    headers: {
      accept: 'application/pdf',
      Authorization: 'Bearer ' + tokenID,
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    },
  }

  try {
    // const response = await axios(config)
    // console.log(response.headers)
    // const content = response.headers['content-type'];
    // let blob = new Blob([response.data], { type: 'application/pdf' })
    // let link = document.createElement('a')
    // link.href = window.URL.createObjectURL(blob)
    // link.download = 'Report.pdf'
    // link.click()

    // const url = window.URL.createObjectURL(new Blob([response.data],{ type: 'application/pdf' }));
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', 'file.pdf'); //or any other extension
    // document.body.appendChild(link);
    // link.click();
    // console.log(url)
    // console.log(link)
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      FileSystem.downloadAsync(
        'http://www.pdf995.com/samples/pdf.pdf',
        FileSystem.documentDirectory + 'test.pdf'
      )
        .then(async ({ uri }) => {
          await MediaLibrary.createAssetAsync(uri)
          // console.log('File saved')
        })
        .catch((err) => {
          // console.log('error', err)
        })
    }

    return { error: false, message: 'Success', status: 200, files: 'url' }
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
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    },
  }

  try {
    const response = await axios(config)
    return response.data.states
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
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    },
  }
  try {
    const response = await axios(config)
    return response.data.districts
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
    '0' +
    (ISTTime.getMonth() + 1)
  ).slice(-2)}-${ISTTime.getFullYear()}`

  const config = {
    method: 'get',
    url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dd_mm_yyyy}`,
    headers: {
      accept: 'application/json',
      'Accept-Language': 'hi_IN',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    },
  }
  // console.log(config)
  try {
    const response = await axios(config)
    // console.log(response.data)

    return { data: response.data.centers }
  } catch (err) {
    return { error: true, message: err.message, data: [] }
  }
}

export const getCalenderByDistrict = async (state, district) => {
  const currentTime = new Date()

  const ISTTime = new Date(
    currentTime.getTime() + (330 + currentTime.getTimezoneOffset()) * 60000
  )
  const dd_mm_yyyy = `${('0' + ISTTime.getDate()).slice(-2)}-${(
    '0' +
    (ISTTime.getMonth() + 1)
  ).slice(-2)}-${ISTTime.getFullYear()}`

  const config = {
    method: 'get',
    url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${dd_mm_yyyy}`,
    headers: {
      accept: 'application/json',
      'Accept-Language': 'hi_IN',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    },
  }
  // console.log(config)

  try {
    const response = await axios(config)
    // console.log(response.data)

    return { data: response.data.centers }
  } catch (err) {
    return { error: true, message: err.message, data: [] }
  }
}

export const checkAppUpdate = async () => {
  const config = {
    method: 'get',
    url: 'https://vaccineapp.blueturrets.com/',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',},
  }
  try {
    const response = await axios(config)

    return { data: response.data }
  } catch (err) {
    return { error: true, message: err.message, data: {} }
  }
}
