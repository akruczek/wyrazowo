import AsyncStorage from '@react-native-async-storage/async-storage'

export const Storage = {
  set: async (key: string, value: string): Promise<void | null> => {
    try {
      const result = await AsyncStorage.setItem(`@${key}`, String(value))
      return result
    } catch (error) {
      return null
    }
  },
  get: async <T>(key: string, raw?: boolean): Promise<T | null> => {
    try {
      const result = await AsyncStorage.getItem(`@${key}`)
      return result != null
        ? raw
          ? result
          : JSON.parse(result)
        : null
    } catch (error) {
      return null
    }
  },
  remove: async (key: string): Promise<void | null> => {
    try {
      const result = await AsyncStorage.removeItem(`@${key}`)
      return result
    } catch (error) {
      return null
    }
  },
}
