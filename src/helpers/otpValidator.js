export function otpValidator(otp) {
  // eslint-disable-next-line radix
  if (otp.length !== 6 || parseInt(otp).toString().length !== 6) {
    return 'Invalid Phone Number'
  }
  return ''
}
