export type FirebaseApp = import('firebase-admin').app.App
export type FirestoreDb = import('firebase-admin').firestore.Firestore
export type RealtimeDb = import('firebase-admin').database.Database
export type StorageDb = import('firebase-admin').storage.Storage

export interface DbHandler {
	getFirestoreInstance: () => FirestoreDb
	getRealtimeInstance: () => RealtimeDb
	getStorageInstance: () => StorageDb
	disconnect: () => void
}

export interface FirebaseConfig {
	databaseURL: string
	storageBucket: string
}

export interface AppConfig {
	firebase?: Partial<FirebaseConfig>
	[key: string]: any
}

export interface Logger {
	info: (message: string, data?: any) => void
	error: (message: string, data: any) => void
}

export interface Dependencies {
	admin: typeof import('firebase-admin')
	config: AppConfig
	logger: Logger
}
