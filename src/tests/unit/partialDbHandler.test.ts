import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { FirebaseHandler } from '../../dbHandler'

import * as adminMocks from '../mocks/firebase-admin'
import * as loggerMocks from '../mocks/logger'
import * as configMocks from '../mocks/config'

describe('Instantiate partial dbHandler', () => {
	let dbHandler: FirebaseHandler

	beforeEach(() => {
		adminMocks.initializeMocks()
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('should create a firestore instance', () => {
		dbHandler = new FirebaseHandler({
			admin: adminMocks.admin,
			logger: loggerMocks.logger,
			config: configMocks.baseConfig,
		})
		expect(dbHandler.getFirestoreInstance()).toBeDefined()
		expect(adminMocks.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMocks.initializeApp).toHaveBeenCalled()
		expect(adminMocks.firestore).toHaveBeenCalled()
		expect(adminMocks.settings).toHaveBeenCalled()
	})

	test('should create a realtime database instance', () => {
		dbHandler = new FirebaseHandler({
			admin: adminMocks.admin,
			logger: loggerMocks.logger,
			config: configMocks.realtimeConfig,
		})
		expect(dbHandler.getRealtimeInstance()).toBeDefined()
		expect(adminMocks.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMocks.initializeApp).toHaveBeenCalled()
		expect(adminMocks.database).toHaveBeenCalled()
	})

	test('should create a storage instance', () => {
		dbHandler = new FirebaseHandler({
			admin: adminMocks.admin,
			logger: loggerMocks.logger,
			config: configMocks.storageConfig,
		})
		expect(dbHandler.getStorageInstance()).toBeDefined()
		expect(adminMocks.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMocks.initializeApp).toHaveBeenCalled()
		expect(adminMocks.storage).toHaveBeenCalled()
	})

	test('should throw an error if realtime database is not configured', () => {
		dbHandler = new FirebaseHandler({
			admin: adminMocks.admin,
			logger: loggerMocks.logger,
			config: configMocks.baseConfig,
		})
		expect(() => dbHandler.getRealtimeInstance()).toThrow()
		expect(loggerMocks.logger.error).toHaveBeenCalled()
	})

	test('should throw an error if storage is not configured', () => {
		dbHandler = new FirebaseHandler({
			admin: adminMocks.admin,
			logger: loggerMocks.logger,
			config: configMocks.baseConfig,
		})
		expect(() => dbHandler.getStorageInstance()).toThrow()
		expect(loggerMocks.logger.error).toHaveBeenCalled()
	})
})
