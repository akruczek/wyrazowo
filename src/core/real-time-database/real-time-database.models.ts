import { FirebaseDatabaseTypes } from '@react-native-firebase/database'

export interface RealTimeDatabaseService {
  getRef: (
    endpoint: string,
  ) => FirebaseDatabaseTypes.Reference;

  readOnce: (
    endpoint: string,
    successCallback?: (data: FirebaseDatabaseTypes.DataSnapshot) => any,
    failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
  ) => Promise<FirebaseDatabaseTypes.DataSnapshot>;

  readOnceByRef: (
    reference: FirebaseDatabaseTypes.ThenableReference,
    successCallback?: (data: FirebaseDatabaseTypes.DataSnapshot) => any,
    failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
  ) => Promise<FirebaseDatabaseTypes.DataSnapshot>;

  addListener: (
    endpoint: string,
    onChanged: (data: FirebaseDatabaseTypes.DataSnapshot) => void,
  ) => (data: FirebaseDatabaseTypes.DataSnapshot | null) => void;

  removeListener: (
    endpoint: string,
    listener: (a: FirebaseDatabaseTypes.DataSnapshot | null) => void,
  ) => void;

  set: <T>(
    endpoint: string,
    value: T,
    onComplete?: (error: Error | null) => void
  ) => Promise<void>;

  update: (
    endpoint: string,
    values: { [key: string]: any },
    onComplete?: (error: Error | null) => void,
  ) => Promise<void>;

  push: (
    endpoint: string,
  ) => FirebaseDatabaseTypes.ThenableReference;

  pushByReference: <T>(
    reference: FirebaseDatabaseTypes.ThenableReference,
    values?: T,
  ) => FirebaseDatabaseTypes.ThenableReference;

  setByReference: <T>(
    reference: FirebaseDatabaseTypes.ThenableReference,
    values: T,
    onComplete?: (error: Error | null) => void,
  ) => Promise<void>;

  remove: (
    endpoint: string,
    onComplete?: (error: Error | null) => void,
  ) => Promise<void>;
}

export interface RealTimeDatabaseUserPointsModel {
  value: number;
  dictionarly: {
    value: number;
    successCount: number;
    failureCount: number;
  };
  charade: {
    value: number;
    successCount: number;
    failureCount: number;
  };
}

export interface RealTimeDatabaseUserModel {
  uid: string;
  points?: RealTimeDatabaseUserPointsModel;
}
