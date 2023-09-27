export class FirebaseHandler implements DbHandler {
	private readonly _admin: Dependencies['admin']
	private readonly _config: Dependencies['config']
	private readonly _logger: Dependencies['logger']

	private _app: FirebaseApp | null = null
	private _firestore: FirestoreDb | null = null
	private _realtimeDb: RealtimeDb | null = null
	private _storage: StorageDb | null = null

	private _firestoreInstance: FirestoreDb | null = null
	private _realtimeInstance: RealtimeDb | null = null
	private _storageInstance: StorageDb | null = null

	constructor({ admin, config, logger }: Dependencies) {
		this._admin = admin
		this._config = config
		this._logger = logger
	}

	private _initializeApp() {
		try {
			this._logger.info('Initialize Firebase App')
			return this._admin.initializeApp({
				credential: this._admin.credential.applicationDefault(),
				databaseURL: this._config.firebase?.databaseURL,
				storageBucket: this._config.firebase?.storageBucket,
			})
		} catch (error) {
			this._logger.error('Error initializing Firebase App', error)
			throw new Error(`Error initializing Firebase App: ${error}`)
		}
	}

	private _connect() {
		if (!this._app) {
			this._app = this._initializeApp()
		}
		return this._app
	}

	private _createFirestoreInstance() {
		try {
			this._logger.info('Connecting to database')
			const app = this._connect()
			this._firestore = this._admin.firestore(app)
			this._firestore.settings({ ignoreUndefinedProperties: true })
			return this._firestore
		} catch (error) {
			this._logger.error('Error in database connection', error)
			throw new Error(`Error in database connection: ${error}`)
		}
	}

	private _createRealtimeInstance() {
		try {
			this._assertRealtimeConfig()
			this._logger.info('Connecting to realtime database')
			const app = this._connect()
			this._realtimeDb = this._admin.database(app)
			return this._realtimeDb
		} catch (error) {
			this._logger.error('Error in realtime database connection', error)
			throw new Error(`Error in realtime database connection: ${error}`)
		}
	}

	private _createStorageInstance() {
		try {
			this._logger.info('Connecting to storage')
			const app = this._connect()
			this._storage = this._admin.storage(app)
			return this._storage
		} catch (error) {
			this._logger.error('Error in storage connection', error)
			throw new Error(`Error in storage connection: ${error}`)
		}
	}

	private _assertRealtimeConfig() {
		if (!this._config.firebase?.databaseURL) {
			throw new Error('Realtime database is not configured')
		}
	}

	public getFirestoreInstance() {
		if (!this._firestoreInstance) {
			this._firestoreInstance = this._createFirestoreInstance()
		}
		return this._firestoreInstance
	}

	public getRealtimeInstance() {
		if (!this._realtimeInstance) {
			this._realtimeInstance = this._createRealtimeInstance()
		}
		return this._realtimeInstance
	}

	public getStorageInstance() {
		if (!this._storageInstance) {
			this._storageInstance = this._createStorageInstance()
		}
		return this._storageInstance
	}

	public disconnect() {
		this._logger.info('Disconnecting from database')
		if (this._app) {
			this._app.delete()
		}
		this._app = null
		this._firestore = null
		this._realtimeDb = null
		this._storage = null

		this._firestoreInstance = null
		this._realtimeInstance = null
		this._storageInstance = null
	}
}
