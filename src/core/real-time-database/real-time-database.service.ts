import {
  DataSnapshot,
  DatabaseReference,
  get,
  getDatabase,
  off,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from '@react-native-firebase/database'
import { RealTimeDatabaseService } from './real-time-database.models'

const REAL_TIME_DATABASE_URL = 'https://wyrazowo-default-rtdb.europe-west1.firebasedatabase.app'

const getDb = () => getDatabase(undefined, REAL_TIME_DATABASE_URL)

const withOptionalComplete = async (
  operation: Promise<void>,
  onComplete?: (error: Error | null) => void,
) => {
  try {
    await operation
    onComplete?.(null)
  } catch (error) {
    onComplete?.(error as Error)
    throw error
  }
}

const readSnapshot = async (
  reference: DatabaseReference,
  successCallback?: (data: DataSnapshot) => any,
  failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
) => {
  try {
    const snapshot = await get(reference)
    successCallback?.(snapshot)
    return snapshot
  } catch (error) {
    if (typeof failureCallbackContext === 'function') {
      failureCallbackContext(error as Error)
    }
    throw error
  }
}

export const realTimeDatabaseService: RealTimeDatabaseService = {
  getRef: (
    endpoint: string,
  ) => ref(getDb(), endpoint),

  readOnce: (
    endpoint: string,
    successCallback?: (data: DataSnapshot) => any,
    failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
  ) => readSnapshot(ref(getDb(), endpoint), successCallback, failureCallbackContext),

  readOnceByRef: (
    reference: DatabaseReference,
    successCallback?: (data: DataSnapshot) => any,
    failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
  ) => readSnapshot(reference, successCallback, failureCallbackContext),

  addListener: (
    endpoint: string,
    onChanged: (data: DataSnapshot) => void,
  ) => onValue(ref(getDb(), endpoint), onChanged),

  removeListener: (
    endpoint: string,
    listener?: (a: DataSnapshot | null) => void,
  ) => {
    off(ref(getDb(), endpoint), 'value', listener)
  },

  set: <T>(
    endpoint: string,
    value: T,
    onComplete?: (error: Error | null) => void
  ) => withOptionalComplete(set(ref(getDb(), endpoint), value), onComplete),

  update: (
    endpoint: string,
    values: { [key: string]: any },
    onComplete?: (error: Error | null) => void,
  ) => withOptionalComplete(update(ref(getDb(), endpoint), values), onComplete),

  push: (
    endpoint: string,
  ) => push(ref(getDb(), endpoint)),

  pushByReference: <T>(
    reference: DatabaseReference,
    values?: T,
  ) => push(reference, values),

  setByReference: <T>(
    reference: DatabaseReference,
    values: T,
    onComplete?: (error: Error | null) => void,
  ) => withOptionalComplete(set(reference, values), onComplete),

  remove: (
    endpoint: string,
    onComplete?: (error: Error | null) => void,
  ) => withOptionalComplete(remove(ref(getDb(), endpoint)), onComplete),
}
