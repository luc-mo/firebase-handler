export const baseConfig = {}

export const realtimeConfig = {
	firebase: {
		databaseURL: 'realtime database test',
	},
}

export const storageConfig = {
	firebase: {
		storageBucket: 'storage bucket test',
	},
}

export const config = {
	firebase: {
		...realtimeConfig.firebase,
		...storageConfig.firebase,
	},
}
