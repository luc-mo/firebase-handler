interface FirebaseConfig {
	databaseURL: string
	storageBucket: string
}

interface AppConfig {
	firebase?: Partial<FirebaseConfig>
	[key: string]: any
}
