import { firebase, FirebaseDatabaseTypes } from '@react-native-firebase/database'
import { RealTimeDatabaseService } from './real-time-database.models'

const REAL_TIME_DATABASE_URL = 'https://wyrazowo-default-rtdb.europe-west1.firebasedatabase.app'

export const realTimeDatabaseService: RealTimeDatabaseService = {
  getRef: (
    endpoint: string,
  ) => firebase
    .app()
    .database(REAL_TIME_DATABASE_URL)
    .ref(endpoint),

  readOnce: (
    endpoint: string,
    successCallback?: (data: FirebaseDatabaseTypes.DataSnapshot) => any,
    failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
  ) => firebase
    .app()
    .database(REAL_TIME_DATABASE_URL)
    .ref(endpoint)
    .once('value', successCallback, failureCallbackContext),

  readOnceByRef: (
    reference: FirebaseDatabaseTypes.ThenableReference,
    successCallback?: (data: FirebaseDatabaseTypes.DataSnapshot) => any,
    failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
  ) => reference
    .once('value', successCallback, failureCallbackContext),

  addListener: (
    endpoint: string,
    onChanged: (data: FirebaseDatabaseTypes.DataSnapshot) => void,
  ) => firebase
    .app()
    .database(REAL_TIME_DATABASE_URL)
    .ref(endpoint)
    .on('value', onChanged),

  removeListener: (
    endpoint: string,
    listener: (a: FirebaseDatabaseTypes.DataSnapshot | null) => void,
  ) => firebase
    .app()
    .database(REAL_TIME_DATABASE_URL)
    .ref(endpoint)
    .off('value', listener),

  set: <T>(
    endpoint: string,
    value: T,
    onComplete?: (error: Error | null) => void
  ) => firebase
    .app()
    .database()
    .ref(endpoint)
    .set(value, onComplete),

  update: (
    endpoint: string,
    values: { [key: string]: any },
    onComplete?: (error: Error | null) => void,
  ) => firebase
    .app()
    .database()
    .ref(endpoint)
    .update(values, onComplete),

  push: (
    endpoint: string,
  ) => firebase
    .app()
    .database()
    .ref(endpoint)
    .push(),

  pushByReference: <T>(
    reference: FirebaseDatabaseTypes.ThenableReference,
    values?: T,
  ) => reference
    .push(values),

  setByReference: <T>(
    reference: FirebaseDatabaseTypes.ThenableReference,
    values: T,
    onComplete?: (error: Error | null) => void,
  ) => reference
    .set(values, onComplete),

  remove: (
    endpoint: string,
    onComplete?: (error: Error | null) => void,
  ) => firebase
    .app()
    .database()
    .ref(endpoint)
    .remove(onComplete)
}
