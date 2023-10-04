import { FirestoreHandler } from '@/services/firestore/firestore.handler'
import type { FirebaseApp, RealtimeDb, StorageDb } from '@/types/firebase'
import type { DbHandler, Dependencies } from '@/types/dbHandler'

export class FirebaseHandler implements DbHandler {
	private readonly _admin: Dependencies['admin']
	private readonly _config: Dependencies['config']
	private readonly _logger: Dependencies['logger']

	private _app: FirebaseApp | null = null
	private _realtimeDb: RealtimeDb | null = null
	private _storage: StorageDb | null = null

	private _realtimeInstance: RealtimeDb | null = null
	private _storageInstance: StorageDb | null = null

	private readonly _firestoreHandler: FirestoreHandler

	constructor(dependencies: Dependencies) {
		this._admin = dependencies.admin
		this._config = dependencies.config
		this._logger = dependencies.logger
		this._firestoreHandler = new FirestoreHandler(dependencies)
	}

	private _initializeApp() {
		try {
			this._logger.info('Initialize Firebase App')
			return this._admin.initializeApp({
				credential: this._handleCredential(),
				databaseURL: this._config.firebase?.databaseURL,
				storageBucket: this._config.firebase?.storageBucket,
			})
		} catch (error) {
			this._logger.error('Error initializing Firebase App', error)
			throw new Error(`Error initializing Firebase App: ${error}`)
		}
	}

	private _handleCredential() {
		const credential = this._config.firebase?.credential
		if (!credential || !Object.keys(credential).length) {
			return this._admin.credential.applicationDefault()
		}
		if (credential.serviceAccount) {
			return this._admin.credential.cert(credential.serviceAccount)
		}
		if (credential.refreshToken) {
			return this._admin.credential.refreshToken(credential.refreshToken)
		}
	}

	private _connect() {
		if (!this._app) {
			this._app = this._initializeApp()
		}
		return this._app
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
			this._assertStorageConfig()
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

	private _assertStorageConfig() {
		if (!this._config.firebase?.storageBucket) {
			throw new Error('Storage is not configured')
		}
	}

	/**
	 * Creates a singleton instance of the Firestore database.
	 * @returns Firestore database instance
	 */
	public getFirestoreInstance() {
		return this._firestoreHandler.getInstance(this._connect())
	}

	/**
	 * Creates a singleton instance of the Realtime database.
	 * If the configuration does not contain the databaseURL, it will throw an error.
	 * @returns Realtime database instance
	 */
	public getRealtimeInstance() {
		if (!this._realtimeInstance) {
			this._realtimeInstance = this._createRealtimeInstance()
		}
		return this._realtimeInstance
	}

	/**
	 * Creates a singleton instance of the Storage database.
	 * If the configuration does not contain the storageBucket, it will throw an error.
	 * @returns Storage bucket instance
	 */
	public getStorageInstance() {
		if (!this._storageInstance) {
			this._storageInstance = this._createStorageInstance()
		}
		return this._storageInstance
	}

	/**
	 * Disconnects from the database.
	 * It will delete the app instance and set all the database instances to null.
	 */
	public disconnect() {
		this._logger.info('Disconnecting from database')
		if (this._app) {
			this._app.delete()
		}
		this._app = null
		this._realtimeDb = null
		this._storage = null

		this._realtimeInstance = null
		this._storageInstance = null

		this._firestoreHandler.disconnect()
	}
}
