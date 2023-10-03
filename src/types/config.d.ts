import type { FirestoreSettings } from '@/types/firebase'

export interface FirebaseConfig {
	databaseURL: string
	storageBucket: string
}

export interface HandlersConfig {
	useFirestoreRecommendedSettings: boolean
}

export interface AppConfig {
	firebase?: Partial<FirebaseConfig>
	firestore?: Partial<FirestoreSettings>
	handlers?: Partial<HandlersConfig>
	[key: string]: any
}
