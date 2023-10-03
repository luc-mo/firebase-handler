import type { FirestoreSettings } from '@/types/firebase'

export enum FirestoreLogs {
	CONNECTION = 'Connecting to Firestore Database',
	DISCONNECTION = 'Disconnecting from Firestore Database',
}

export enum FirestoreErrors {
	CONNECTION = 'Error connecting to Firestore Database',
	DISCONNECTION = 'Error disconnecting from Firestore Database',
}

export const FirestoreRecommendedSettings: FirestoreSettings = {
	ignoreUndefinedProperties: true,
}
