/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getValue = async (key) => {
  try {
    const val = await AsyncStorage.getItem(key)
    return val
  } catch (err) {
    return 'not_found'
  }
}

export const setValue = async (key, value) => {
  try {
    const val = await AsyncStorage.setItem(key, value)
    return 'success'
  } catch (err) {
    return 'error'
  }
}

export const removeValue = async (key) => {
  try {
    const val = await AsyncStorage.removeItem(key)
    return 'success'
  } catch (err) {
    return 'error'
  }
}
