import type {
	FirebaseAdmin,
	FirebaseApp,
	FirestoreDb,
	RealtimeDb,
	StorageDb,
} from '@/types/firebase'

// Database handler and service interfaces
export interface DbHandler {
	getFirestoreInstance: () => FirestoreDb
	getRealtimeInstance: () => RealtimeDb
	getStorageInstance: () => StorageDb
	disconnect: () => void
}

export interface DbService<T extends FirestoreDb | RealtimeDb | StorageDb> {
	getInstance: (app: FirebaseApp) => T
	disconnect: () => void
}

// Configuration and logger interfaces
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

// Dependencies interface
export interface Dependencies {
	admin: FirebaseAdmin
	config: AppConfig
	logger: Logger
}
