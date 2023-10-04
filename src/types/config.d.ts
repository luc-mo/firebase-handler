import type { ServiceAccount, RefreshToken, FirestoreSettings } from '@/types/firebase'

export interface FirebaseCredential {
	serviceAccount: ServiceAccount
	refreshToken: RefreshToken
}

export interface FirebaseConfig {
	databaseURL: string
	storageBucket: string
	credential: Partial<FirebaseCredential>
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
