// Configuration and logger interfaces
export interface FirebaseConfig {
	databaseURL: string
	storageBucket: string
}

export interface AppConfig {
	firebase?: Partial<FirebaseConfig>
	[key: string]: any
}
