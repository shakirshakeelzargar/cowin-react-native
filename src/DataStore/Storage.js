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
