interface BaseConfig {
	[key: string]: any
}

interface StorageConfig extends BaseConfig {
	firebase: {
		storageBucket: string
	}
}

interface DatabaseConfig extends BaseConfig {
	firebase: {
		databaseURL: string
	}
}

type AppConfig = BaseConfig & Partial<StorageConfig & DatabaseConfig>
