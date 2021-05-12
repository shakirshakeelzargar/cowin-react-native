/* eslint-disable eqeqeq */
/* eslint-disable radix */
export function phoneValidator(phone) {
  if (phone.length !== 10 || parseInt(phone).toString().length !== 10) {
    return 'Invalid Phone Number'
  }
  return ''
}
