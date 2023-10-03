import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { FirestoreHandler } from '../../services/firestore/firestore.handler'

import * as adminMocks from '../mocks/firebase-admin'
import * as configMocks from '../mocks/config'
import * as loggerMocks from '../mocks/logger'

describe('Instantiate firestoreHandler', () => {
	let firestoreHandler: FirestoreHandler

	beforeEach(() => {
		adminMocks.initializeMocks()
		firestoreHandler = new FirestoreHandler({
			admin: adminMocks.admin,
			config: configMocks.config,
			logger: loggerMocks.logger,
		})
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('should be a function', () => {
		expect(typeof FirestoreHandler).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof firestoreHandler).toBe('object')
		expect(typeof firestoreHandler.getInstance).toBe('function')
		expect(typeof firestoreHandler.disconnect).toBe('function')
	})

	test('should create a database instance', () => {
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		expect(adminMocks.firestore).toHaveBeenCalledWith('appMock')
		expect(adminMocks.settings).toHaveBeenCalled()
	})

	test('should create only one database instance', () => {
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		expect(loggerMocks.logger.info).toHaveBeenCalledTimes(1)
		expect(adminMocks.firestore).toHaveBeenCalledWith('appMock')
		expect(adminMocks.firestore).toHaveBeenCalledTimes(1)
		expect(adminMocks.settings).toHaveBeenCalledTimes(1)
	})

	test('should disconnect from the database', async () => {
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		await expect(firestoreHandler.disconnect()).resolves.toBeUndefined()
		expect(adminMocks.firestore).toHaveBeenCalledWith('appMock')
		expect(adminMocks.terminate).toHaveBeenCalledTimes(1)
		expect(loggerMocks.logger.info).toHaveBeenCalledTimes(2)
	})

	test('should throw an error if the database connection fails', () => {
		adminMocks.firestore.mockImplementationOnce(() => {
			throw new Error('Firestore error')
		})
		expect(() => firestoreHandler.getInstance('appMock')).toThrow()
	})

	test('should throw an error if the database disconnection fails', async () => {
		adminMocks.terminate.mockImplementationOnce(() => {
			throw new Error('Firestore error')
		})
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		await expect(firestoreHandler.disconnect()).rejects.toThrow()
	})
})
