import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { FirebaseHandler } from '../../dbHandler'

import * as adminMocks from '../mocks/firebase-admin'
import * as loggerMocks from '../mocks/logger'
import * as configMocks from '../mocks/config'

describe('Instantiate dbHandler', () => {
	let dbHandler: FirebaseHandler

	beforeEach(() => {
		adminMocks.initializeMocks()
		dbHandler = new FirebaseHandler({
			admin: adminMocks.admin,
			config: configMocks.config,
			logger: loggerMocks.logger,
		})
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('should be a function', () => {
		expect(typeof FirebaseHandler).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof dbHandler).toBe('object')
		expect(typeof dbHandler.getFirestoreInstance).toBe('function')
		expect(typeof dbHandler.getRealtimeInstance).toBe('function')
		expect(typeof dbHandler.getStorageInstance).toBe('function')
		expect(typeof dbHandler.disconnect).toBe('function')
	})

	test('should create a realtime database instance', () => {
		expect(dbHandler.getRealtimeInstance()).toBeDefined()
		expect(adminMocks.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMocks.initializeApp).toHaveBeenCalled()
		expect(adminMocks.database).toHaveBeenCalled()
	})

	test('should create only one realtime database instance', () => {
		expect(dbHandler.getRealtimeInstance()).toBeDefined()
		expect(dbHandler.getRealtimeInstance()).toBeDefined()
		expect(loggerMocks.logger.info).toHaveBeenCalledTimes(2)
		expect(adminMocks.credential.applicationDefault).toHaveBeenCalledTimes(1)
		expect(adminMocks.initializeApp).toHaveBeenCalledTimes(1)
		expect(adminMocks.database).toHaveBeenCalledTimes(1)
	})

	test('should create a storage instance', () => {
		expect(dbHandler.getStorageInstance()).toBeDefined()
		expect(adminMocks.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMocks.initializeApp).toHaveBeenCalled()
		expect(adminMocks.storage).toHaveBeenCalled()
	})

	test('should create only one storage instance', () => {
		expect(dbHandler.getStorageInstance()).toBeDefined()
		expect(dbHandler.getStorageInstance()).toBeDefined()
		expect(loggerMocks.logger.info).toHaveBeenCalledTimes(2)
		expect(adminMocks.credential.applicationDefault).toHaveBeenCalledTimes(1)
		expect(adminMocks.initializeApp).toHaveBeenCalledTimes(1)
		expect(adminMocks.storage).toHaveBeenCalledTimes(1)
	})

	test('should disconnect from database', () => {
		expect(dbHandler.getFirestoreInstance()).toBeDefined()
		expect(dbHandler.disconnect()).toBeUndefined()
		expect(adminMocks.deleteMock).toHaveBeenCalled()
	})
})
