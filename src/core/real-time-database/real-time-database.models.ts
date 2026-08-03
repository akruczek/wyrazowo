import {
  DataSnapshot,
  DatabaseReference,
  ThenableReference,
  Unsubscribe,
} from '@react-native-firebase/database'

export interface RealTimeDatabaseService {
  getRef: (
    endpoint: string,
  ) => DatabaseReference;

  readOnce: (
    endpoint: string,
    successCallback?: (data: DataSnapshot) => any,
    failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
  ) => Promise<DataSnapshot>;

  readOnceByRef: (
    reference: DatabaseReference,
    successCallback?: (data: DataSnapshot) => any,
    failureCallbackContext?: ((error: Error) => void) | Record<string, any> | null,
  ) => Promise<DataSnapshot>;

  addListener: (
    endpoint: string,
    onChanged: (data: DataSnapshot) => void,
  ) => Unsubscribe;

  removeListener: (
    endpoint: string,
    listener?: (a: DataSnapshot | null) => void,
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
  ) => ThenableReference;

  pushByReference: <T>(
    reference: DatabaseReference,
    values?: T,
  ) => ThenableReference;

  setByReference: <T>(
    reference: DatabaseReference,
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
