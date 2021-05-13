/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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
    // console.log(response.data)
    const demo_response = {
      data: {
        centers: [
          {
            center_id: 105395,
            name: 'GADOORA Centre',
            address: '',
            state_name: 'Jammu and Kashmir',
            district_name: 'Ganderbal',
            block_name: 'Ganderbal',
            pincode: 191131,
            lat: 34,
            long: 74,
            from: '10:00:00',
            to: '16:00:00',
            fee_type: 'Free',
            sessions: [
              {
                session_id: '2c193f80-e86b-4b90-82c5-5ffcfe6fcb83',
                date: '13-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
              {
                session_id: '0dde020e-5684-4e9b-877c-37bd3f947ff7',
                date: '14-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:30AM-11:30AM',
                  '11:30AM-12:30PM',
                  '12:30PM-01:30PM',
                  '01:30PM-04:00PM',
                ],
              },
              {
                session_id: '091699bc-6f1e-4b56-a1c9-f4bfaf411207',
                date: '17-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
            ],
          },
          {
            center_id: 106328,
            name: 'SC LAR',
            address: '',
            state_name: 'Jammu and Kashmir',
            district_name: 'Ganderbal',
            block_name: 'Lar',
            pincode: 191131,
            lat: 34,
            long: 74,
            from: '10:00:00',
            to: '16:00:00',
            fee_type: 'Free',
            sessions: [
              {
                session_id: '249daa53-09fb-4324-a907-09a14dd3340b',
                date: '13-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
            ],
          },
          {
            center_id: 106330,
            name: 'SC WATLAR',
            address: '',
            state_name: 'Jammu and Kashmir',
            district_name: 'Ganderbal',
            block_name: 'Lar',
            pincode: 191131,
            lat: 34,
            long: 74,
            from: '10:00:00',
            to: '16:00:00',
            fee_type: 'Free',
            sessions: [
              {
                session_id: '224e86eb-9d9e-4ee0-a7f0-fa3e7e1384cf',
                date: '13-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
              {
                session_id: '92e10102-3b14-4c13-a1ec-df3ca04ceca1',
                date: '16-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
              {
                session_id: '85f04579-0966-47b5-9c18-e2e50fc36c32',
                date: '17-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
              {
                session_id: 'f82d3169-42ff-4da6-ae9c-4117e117d57c',
                date: '18-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
            ],
          },
          {
            center_id: 105396,
            name: 'GUND REHMAN Centre',
            address: '',
            state_name: 'Jammu and Kashmir',
            district_name: 'Ganderbal',
            block_name: 'Ganderbal',
            pincode: 191131,
            lat: 34,
            long: 74,
            from: '10:00:00',
            to: '16:00:00',
            fee_type: 'Free',
            sessions: [
              {
                session_id: '7ae40431-3dc7-405a-b3f8-b8161dbc300f',
                date: '13-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
            ],
          },
          {
            center_id: 105394,
            name: 'HAKIM GUND Centre',
            address: '',
            state_name: 'Jammu and Kashmir',
            district_name: 'Ganderbal',
            block_name: 'Ganderbal',
            pincode: 191131,
            lat: 34,
            long: 74,
            from: '10:00:00',
            to: '16:00:00',
            fee_type: 'Free',
            sessions: [
              {
                session_id: '26cb49e9-1493-40ac-b3ca-ece8772767e3',
                date: '13-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:00AM-11:00AM',
                  '11:00AM-12:00PM',
                  '12:00PM-01:00PM',
                  '01:00PM-04:00PM',
                ],
              },
              {
                session_id: '9776e081-0005-42be-bd37-be67e6e0cd58',
                date: '16-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:30AM-11:30AM',
                  '11:30AM-12:30PM',
                  '12:30PM-01:30PM',
                  '01:30PM-04:00PM',
                ],
              },
            ],
          },
          {
            center_id: 105405,
            name: 'Narayen Bagh',
            address: '',
            state_name: 'Jammu and Kashmir',
            district_name: 'Ganderbal',
            block_name: 'Wakura',
            pincode: 191131,
            lat: 34.175542,
            long: 74.692021,
            from: '10:30:00',
            to: '16:00:00',
            fee_type: 'Free',
            sessions: [
              {
                session_id: '50fd5eab-8b19-419a-9fcf-7cdb7442917b',
                date: '15-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:30AM-11:30AM',
                  '11:30AM-12:30PM',
                  '12:30PM-01:30PM',
                  '01:30PM-04:00PM',
                ],
              },
            ],
          },
          {
            center_id: 105749,
            name: 'ZAZNAA',
            address: '',
            state_name: 'Jammu and Kashmir',
            district_name: 'Ganderbal',
            block_name: 'Wakura',
            pincode: 191131,
            lat: 34.2151,
            long: 74.685772,
            from: '10:30:00',
            to: '16:00:00',
            fee_type: 'Free',
            sessions: [
              {
                session_id: '21266d91-b726-4a5d-974b-1cb173bab12d',
                date: '19-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:30AM-11:30AM',
                  '11:30AM-12:30PM',
                  '12:30PM-01:30PM',
                  '01:30PM-04:00PM',
                ],
              },
            ],
          },
          {
            center_id: 105406,
            name: 'SC Kourg',
            address: '',
            state_name: 'Jammu and Kashmir',
            district_name: 'Ganderbal',
            block_name: 'Wakura',
            pincode: 191131,
            lat: 34,
            long: 74,
            from: '10:30:00',
            to: '16:00:00',
            fee_type: 'Free',
            sessions: [
              {
                session_id: '2e97dd6e-90a9-4f3f-8bcc-d9c9c7af4114',
                date: '19-04-2021',
                available_capacity: 50,
                min_age_limit: 45,
                vaccine: 'COVISHIELD',
                slots: [
                  '10:30AM-11:30AM',
                  '11:30AM-12:30PM',
                  '12:30PM-01:30PM',
                  '01:30PM-04:00PM',
                ],
              },
            ],
          },
        ],
      },
    }

    return { data: response.data.centers }
  } catch (err) {
    return { error: true, message: err.message, data: [] }
  }
}
