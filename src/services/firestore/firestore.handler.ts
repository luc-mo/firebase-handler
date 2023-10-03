import { FirestoreError } from './firestore.error'
import { FirestoreLogs, FirestoreErrors, FirestoreRecommendedSettings } from './firestore.constant'
import type { FirebaseApp, FirestoreDb, FirestoreSettings } from '@/types/firebase'
import type { DbService, Dependencies } from '@/types/dbHandler'

export class FirestoreHandler implements DbService<FirestoreDb> {
	private readonly _admin: Dependencies['admin']
	private readonly _config: Dependencies['config']
	private readonly _logger: Dependencies['logger']

	private _firestore: FirestoreDb | null = null
	private _firestoreInstance: FirestoreDb | null = null

	constructor({ admin, config, logger }: Dependencies) {
		this._admin = admin
		this._config = config
		this._logger = logger
	}

	private _createInstance(app: FirebaseApp) {
		try {
			this._logger.info(FirestoreLogs.CONNECTION)
			this._firestore = this._admin.firestore(app)
			this._firestore.settings(this._handleSettings())
			return this._firestore
		} catch (error) {
			this._handleInstanceError(FirestoreErrors.CONNECTION, error)
		}
	}

	private _handleSettings() {
		const settings: FirestoreSettings = {}
		if (this._config.handlers?.useFirestoreRecommendedSettings) {
			Object.assign(settings, FirestoreRecommendedSettings)
		}
		if (this._config.firestore) {
			Object.assign(settings, this._config.firestore)
		}
		return settings
	}

	/**
	 * Creates a singleton instance of the Storage database.
	 * If the configuration does not contain the storageBucket, it will throw an error.
	 * @param app Firebase app instance.
	 * @returns Storage bucket instance.
	 */
	public getInstance(app: FirebaseApp) {
		if (!this._firestoreInstance) {
			this._firestoreInstance = this._createInstance(app)
		}
		return this._firestoreInstance
	}

	/**
	 * Disconnects from the Firestore database.
	 * @returns A Promise that resolves when the connection is closed.
	 */
	public async disconnect() {
		try {
			if (!this._firestoreInstance) return
			this._logger.info(FirestoreLogs.DISCONNECTION)
			await this._firestoreInstance.terminate()
			this._firestoreInstance = null
			this._firestore = null
		} catch (error) {
			this._handleInstanceError(FirestoreErrors.DISCONNECTION, error)
		}
	}

	private _handleInstanceError(message: string, error: unknown): never {
		this._logger.error(message, error)
		if (error instanceof Error) {
			throw new FirestoreError(`${message}: ${error.message}`)
		}
		throw new FirestoreError(`${message}: ${error}`)
	}
}
