interface Logger {
	info: (message: string, data?: any) => void
	error: (message: string, data: any) => void
}

interface Dependencies {
	admin: typeof import('firebase-admin')
	config: AppConfig
	logger: Logger
}
