// Firebase Admin SDK types
export type FirebaseAdmin = typeof import('firebase-admin')

export type FirebaseApp = import('firebase-admin').app.App
export type ServiceAccount = string | import('firebase-admin').ServiceAccount
export type RefreshToken = string | object

export type FirestoreDb = import('firebase-admin').firestore.Firestore
export type FirestoreSettings = import('firebase-admin').firestore.Settings

export type RealtimeDb = import('firebase-admin').database.Database
export type StorageDb = import('firebase-admin').storage.Storage