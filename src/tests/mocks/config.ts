export const emptyConfigMock = {}

export const realtimeConfigMock = {
	firebase: {
		databaseURL: 'realtime database test',
	},
}

export const storageConfigMock = {
	firebase: {
		storageBucket: 'storage bucket test',
	},
}

export const configMock = {
	firebase: {
		...realtimeConfigMock.firebase,
		...storageConfigMock.firebase,
	},
}
