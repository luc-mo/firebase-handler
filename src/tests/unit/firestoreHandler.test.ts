import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { FirestoreHandler } from '../../services/firestore/firestoreHandler'
import { adminMock, settingsMock, terminateMock, loggerMock } from '../mocks/unit'
import { configMock } from '../mocks/config'

describe('Instantiate firestoreHandler', () => {
	let firestoreHandler: FirestoreHandler

	beforeEach(() => {
		adminMock.firestore.mockReturnValue({ settings: settingsMock, terminate: terminateMock })
		firestoreHandler = new FirestoreHandler({
			admin: adminMock,
			config: configMock,
			logger: loggerMock,
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
		expect(adminMock.firestore).toHaveBeenCalledWith('appMock')
		expect(settingsMock).toHaveBeenCalled()
	})

	test('should create only one database instance', () => {
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		expect(loggerMock.info).toHaveBeenCalledTimes(1)
		expect(adminMock.firestore).toHaveBeenCalledWith('appMock')
		expect(adminMock.firestore).toHaveBeenCalledTimes(1)
		expect(settingsMock).toHaveBeenCalledTimes(1)
	})

	test('should disconnect from the database', async () => {
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		await expect(firestoreHandler.disconnect()).resolves.toBeUndefined()
		expect(adminMock.firestore).toHaveBeenCalledWith('appMock')
		expect(loggerMock.info).toHaveBeenCalledTimes(2)
		expect(terminateMock).toHaveBeenCalledTimes(1)
	})

	test('should throw an error if the database connection fails', () => {
		adminMock.firestore.mockImplementationOnce(() => {
			throw new Error('Firestore error')
		})
		expect(() => firestoreHandler.getInstance('appMock')).toThrow()
	})

	test('should throw an error if the database disconnection fails', async () => {
		terminateMock.mockImplementationOnce(() => {
			throw new Error('Firestore error')
		})
		expect(firestoreHandler.getInstance('appMock')).toBeDefined()
		await expect(firestoreHandler.disconnect()).rejects.toThrow()
	})
})
