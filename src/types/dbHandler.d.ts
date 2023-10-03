import type {
	FirebaseAdmin,
	FirebaseApp,
	FirestoreDb,
	RealtimeDb,
	StorageDb,
} from '@/types/firebase'
import type { AppConfig } from '@/types/config'
import type { Logger } from '@/types/logger'

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

// Dependencies interface
export interface Dependencies {
	admin: FirebaseAdmin
	config: AppConfig
	logger: Logger
}
