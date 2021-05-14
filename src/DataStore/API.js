const axios = require('axios')
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
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


export const getCertificate = async (requestID, tokenID) => {
  var axios = require('axios');
console.log(tokenID)
console.log(requestID)
var config = {
  method: 'get',
  url: 'https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=' + requestID,
  headers: { 
    'accept': 'application/pdf', 
    'Authorization': 'Bearer ' + tokenID
  }
};


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
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {

            FileSystem.downloadAsync("http://www.pdf995.com/samples/pdf.pdf", FileSystem.documentDirectory + 'test.pdf')
            .then( async ({uri}) => {
                await MediaLibrary.createAssetAsync(uri)
                console.log("File saved")
            }).catch((err) => {
               console.log('error',err)
            })
        }
    

  return { error: false, message: "Success" ,status:200 ,files : 'url' }
} catch (err) {
  return { error: true, message: err.message }
}




}
